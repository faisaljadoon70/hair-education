import { PDFDocument } from 'pdf-lib';
import { supabase } from '@/lib/supabaseClient';

interface PDFImage {
  bytes: Uint8Array;
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
    xref?: number;
  };
}

export async function extractImagesFromPDF(file: File): Promise<PDFImage[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const images: PDFImage[] = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();
      
      // Get all image objects from the page
      const pageImages = await page.node.Resources().lookup('XObject', 'Image');
      if (!pageImages) continue;

      for (const [name, imageRef] of Object.entries(pageImages.dict)) {
        const image = await imageRef.lookupAsync();
        if (!image) continue;

        const imageBytes = await image.getBytes();
        const format = determineImageFormat(imageBytes);
        
        if (format) {
          images.push({
            bytes: imageBytes,
            metadata: {
              width: image.get('Width'),
              height: image.get('Height'),
              format,
              size: imageBytes.length,
              xref: imageRef.objectNumber
            }
          });
        }
      }
    }

    return images;
  } catch (error) {
    console.error('Error extracting images from PDF:', error);
    throw new Error('Failed to extract images from PDF');
  }
}

function determineImageFormat(bytes: Uint8Array): string | null {
  // Check magic numbers for common image formats
  if (bytes[0] === 0xFF && bytes[1] === 0xD8) return 'jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'png';
  if (bytes[0] === 0x47 && bytes[1] === 0x49) return 'gif';
  return null;
}

export async function processPDFImages(file: File, userId: string) {
  try {
    const images = await extractImagesFromPDF(file);
    const results = [];

    for (const image of images) {
      // Convert image bytes to Blob
      const blob = new Blob([image.bytes], { type: `image/${image.metadata.format}` });
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${image.metadata.format}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      // Update image database
      const { data: imageData, error: imageError } = await supabase
        .from('images')
        .insert({
          user_id: userId,
          url: publicUrl,
          original_name: file.name,
          storage_path: fileName,
          metadata: {
            ...image.metadata,
            source: 'pdf',
            original_file: file.name
          }
        })
        .select()
        .single();

      if (imageError) throw imageError;

      // Update solver database
      const { error: solverError } = await supabase
        .from('solver')
        .insert({
          user_id: userId,
          image_url: publicUrl,
          status: 'pending_recognition',
          metadata: {
            source: 'pdf',
            xref: image.metadata.xref,
            original_file: file.name
          },
          created_at: new Date().toISOString()
        });

      if (solverError) throw solverError;

      results.push(imageData);
    }

    return results;
  } catch (error) {
    console.error('Error processing PDF images:', error);
    throw error;
  }
}

export async function validatePDFFile(file: File): Promise<boolean> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    return true;
  } catch {
    return false;
  }
}
