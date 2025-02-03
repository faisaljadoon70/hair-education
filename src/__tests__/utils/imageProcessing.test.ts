import { uploadImage, getRecentImages } from '@/utils/imageProcessing';
import { supabase } from '@/lib/supabaseClient';

jest.mock('@/lib/supabaseClient');

describe('imageProcessing', () => {
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  const mockUserId = 'test-user-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadImage', () => {
    it('uploads image to both databases', async () => {
      // Mock successful storage upload
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: jest.fn().mockResolvedValue({ data: { path: 'test.jpg' } }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://test.com/test.jpg' } }),
      });

      // Mock successful database inserts
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValue({ data: { id: 'test-id' } }),
        select: jest.fn().mockResolvedValue({ data: { id: 'test-id' } }),
      });

      const result = await uploadImage(mockFile, mockUserId);

      // Check storage upload
      expect(supabase.storage.from).toHaveBeenCalledWith('images');
      
      // Check image database insert
      expect(supabase.from).toHaveBeenCalledWith('images');
      
      // Check solver database insert
      expect(supabase.from).toHaveBeenCalledWith('solver');

      expect(result).toBeDefined();
    });

    it('handles upload errors', async () => {
      const error = new Error('Upload failed');
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: jest.fn().mockRejectedValue(error),
      });

      await expect(uploadImage(mockFile, mockUserId)).rejects.toThrow('Upload failed');
    });
  });

  describe('getRecentImages', () => {
    const mockImages = [
      { id: '1', url: 'test1.jpg', created_at: new Date().toISOString() },
      { id: '2', url: 'test2.jpg', created_at: new Date().toISOString() },
    ];

    const mockSolverData = [
      { image_url: 'test1.jpg', recognition_data: { type: 'test' } },
    ];

    it('fetches images from both databases', async () => {
      (supabase.from as jest.Mock).mockImplementation((table) => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue(
          table === 'images' 
            ? { data: mockImages, error: null }
            : { data: mockSolverData, error: null }
        ),
      }));

      const result = await getRecentImages(mockUserId);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('recognition');
      expect(supabase.from).toHaveBeenCalledWith('images');
      expect(supabase.from).toHaveBeenCalledWith('solver');
    });

    it('handles database errors', async () => {
      const error = new Error('Database error');
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ error }),
      });

      await expect(getRecentImages(mockUserId)).rejects.toThrow('Database error');
    });
  });
});
