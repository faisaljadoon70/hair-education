import { extractImagesFromPDF, processPDFImages, validatePDFFile } from '@/utils/pdfProcessor';
import { supabase } from '@/lib/supabaseClient';

jest.mock('@/lib/supabaseClient');

describe('pdfProcessor', () => {
  const mockPDFFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
  const mockUserId = 'test-user-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('extractImagesFromPDF', () => {
    it('extracts images from PDF', async () => {
      const mockImageData = new Uint8Array([0xFF, 0xD8]); // JPEG magic numbers
      const mockPDFDoc = {
        getPages: jest.fn().mockReturnValue([{
          getSize: jest.fn().mockReturnValue({ width: 100, height: 100 }),
          node: {
            Resources: jest.fn().mockReturnValue({
              lookup: jest.fn().mockReturnValue({
                dict: {
                  'Image1': {
                    lookupAsync: jest.fn().mockResolvedValue({
                      getBytes: jest.fn().mockResolvedValue(mockImageData),
                      get: jest.fn().mockImplementation((key) => key === 'Width' ? 100 : 100),
                    }),
                    objectNumber: 1,
                  },
                },
              }),
            }),
          },
        }]),
      };

      jest.mock('pdf-lib', () => ({
        PDFDocument: {
          load: jest.fn().mockResolvedValue(mockPDFDoc),
        },
      }));

      const images = await extractImagesFromPDF(mockPDFFile);
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveProperty('metadata.format', 'jpeg');
    });

    it('handles extraction errors', async () => {
      jest.mock('pdf-lib', () => ({
        PDFDocument: {
          load: jest.fn().mockRejectedValue(new Error('PDF load failed')),
        },
      }));

      await expect(extractImagesFromPDF(mockPDFFile)).rejects.toThrow('Failed to extract images from PDF');
    });
  });

  describe('processPDFImages', () => {
    const mockImages = [{
      bytes: new Uint8Array([0xFF, 0xD8]),
      metadata: {
        width: 100,
        height: 100,
        format: 'jpeg',
        size: 2,
        xref: 1,
      },
    }];

    beforeEach(() => {
      jest.spyOn(global, 'extractImagesFromPDF').mockResolvedValue(mockImages);
    });

    it('processes and uploads PDF images', async () => {
      // Mock storage upload
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: jest.fn().mockResolvedValue({ data: { path: 'test.jpg' } }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://test.com/test.jpg' } }),
      });

      // Mock database inserts
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValue({ data: { id: 'test-id' } }),
        select: jest.fn().mockResolvedValue({ data: { id: 'test-id' } }),
      });

      const results = await processPDFImages(mockPDFFile, mockUserId);
      expect(results).toHaveLength(1);
      expect(supabase.storage.from).toHaveBeenCalledWith('images');
      expect(supabase.from).toHaveBeenCalledWith('images');
      expect(supabase.from).toHaveBeenCalledWith('solver');
    });

    it('handles processing errors', async () => {
      const error = new Error('Upload failed');
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: jest.fn().mockRejectedValue(error),
      });

      await expect(processPDFImages(mockPDFFile, mockUserId)).rejects.toThrow('Upload failed');
    });
  });

  describe('validatePDFFile', () => {
    it('validates valid PDF file', async () => {
      jest.mock('pdf-lib', () => ({
        PDFDocument: {
          load: jest.fn().mockResolvedValue({}),
        },
      }));

      const isValid = await validatePDFFile(mockPDFFile);
      expect(isValid).toBe(true);
    });

    it('invalidates non-PDF file', async () => {
      jest.mock('pdf-lib', () => ({
        PDFDocument: {
          load: jest.fn().mockRejectedValue(new Error('Invalid PDF')),
        },
      }));

      const isValid = await validatePDFFile(mockPDFFile);
      expect(isValid).toBe(false);
    });
  });
});
