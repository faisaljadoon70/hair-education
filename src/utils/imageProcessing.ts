import { supabase } from '@/lib/supabaseClient';
import { useTutorialStore } from '@/store/tutorialStore';

export interface ProcessedImage {
  url: string;
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
  };
  recognition?: {
    labels: string[];
    confidence: number;
  };
}

export async function processImage(file: File): Promise<ProcessedImage> {
  const store = useTutorialStore.getState();
  
  try {
    store.setImageProcessingStatus('processing');

    // 1. Upload to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    // 3. Update image database
    const { error: imageDbError } = await supabase
      .from('images')
      .insert({
        url: publicUrl,
        original_name: file.name,
        storage_path: fileName,
        metadata: {
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }
      });

    if (imageDbError) throw imageDbError;

    // 4. Update solver database with recognition data
    const { error: solverDbError } = await supabase
      .from('solver')
      .insert({
        image_url: publicUrl,
        status: 'pending_recognition',
        created_at: new Date().toISOString()
      });

    if (solverDbError) throw solverDbError;

    // 5. Create processed image response
    const processedImage: ProcessedImage = {
      url: publicUrl,
      metadata: {
        width: 0, // Will be set after image loads
        height: 0,
        format: file.type,
        size: file.size
      }
    };

    // 6. Load image to get dimensions
    const img = new Image();
    img.src = publicUrl;
    await new Promise((resolve, reject) => {
      img.onload = () => {
        processedImage.metadata.width = img.width;
        processedImage.metadata.height = img.height;
        resolve(null);
      };
      img.onerror = reject;
    });

    store.setImageProcessingStatus('success');
    store.setCurrentImage(publicUrl);

    return processedImage;
  } catch (error) {
    store.setImageProcessingStatus('error');
    store.setImageProcessingError(error instanceof Error ? error.message : 'Failed to process image');
    throw error;
  }
}

export async function getImageRecognitionStatus(imageUrl: string) {
  const { data, error } = await supabase
    .from('solver')
    .select('status, recognition_data')
    .eq('image_url', imageUrl)
    .single();

  if (error) throw error;
  return data;
}

export async function getRecentImages(userId: string, hours: number = 3): Promise<ProcessedImage[]> {
  const timeAgo = new Date();
  timeAgo.setHours(timeAgo.getHours() - hours);

  // Fetch from both databases
  const [imagesResponse, solverResponse] = await Promise.all([
    supabase
      .from('images')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', timeAgo.toISOString())
      .order('created_at', { ascending: false }),
    supabase
      .from('solver')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', timeAgo.toISOString())
      .order('created_at', { ascending: false })
  ]);

  if (imagesResponse.error) throw imagesResponse.error;
  if (solverResponse.error) throw solverResponse.error;

  // Combine the results
  const images = imagesResponse.data;
  const solverData = solverResponse.data;

  return images.map(img => {
    const solverResult = solverData.find(s => s.image_url === img.url);
    return {
      ...img,
      recognition: solverResult?.recognition_data
    };
  });
}

export function useImageUpload() {
  const store = useTutorialStore();

  const uploadImage = async (file: File) => {
    try {
      const processedImage = await processImage(file);
      return processedImage;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  return {
    uploadImage,
    status: store.imageProcessing.status,
    error: store.imageProcessing.error,
    currentImage: store.imageProcessing.currentImage
  };
}
