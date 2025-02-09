import * as tf from '@tensorflow/tfjs';

interface ColorProcessingOptions {
  canvas: HTMLCanvasElement;
  segmentation: tf.Tensor;
  color: string;
  undertone: string;
}

export class ColorProcessor {
  private static instance: ColorProcessor;
  private initialized: boolean = false;

  private constructor() {}

  static async initialize(): Promise<void> {
    if (!ColorProcessor.instance) {
      ColorProcessor.instance = new ColorProcessor();
      await ColorProcessor.instance.setup();
    }
    return;
  }

  private async setup(): Promise<void> {
    if (this.initialized) return;
    
    // Initialize WebGL context and shaders
    await this.initializeWebGL();
    
    // Load color processing models
    await this.loadModels();
    
    this.initialized = true;
  }

  private async initializeWebGL(): Promise<void> {
    // WebGL initialization for advanced color processing
    // This will be used for real-time color blending
  }

  private async loadModels(): Promise<void> {
    // Load any necessary models for color processing
    // This could include models for lighting analysis, etc.
  }

  static async applyColor(options: ColorProcessingOptions): Promise<void> {
    const { canvas, segmentation, color, undertone } = options;
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Get current image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Convert segmentation tensor to mask
    const mask = await segmentation.data();
    
    // Parse color
    const rgbColor = hexToRgb(color);
    if (!rgbColor) throw new Error('Invalid color format');

    // Process the image
    const processedData = await processImageData(
      imageData,
      mask,
      rgbColor,
      undertone
    );

    // Update canvas with new image data
    ctx.putImageData(processedData, 0, 0);
  }
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Process image data with color blending
async function processImageData(
  imageData: ImageData,
  mask: Float32Array,
  color: { r: number; g: number; b: number },
  undertone: string
): Promise<ImageData> {
  const data = imageData.data;
  
  // Process each pixel
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] > 0.5) { // Hair pixel detected
      const idx = i * 4;
      
      // Get original pixel values
      const originalR = data[idx];
      const originalG = data[idx + 1];
      const originalB = data[idx + 2];
      
      // Calculate luminance to preserve lighting
      const luminance = (originalR * 0.299 + originalG * 0.587 + originalB * 0.114) / 255;
      
      // Apply color with luminance preservation
      data[idx] = Math.min(255, color.r * luminance);
      data[idx + 1] = Math.min(255, color.g * luminance);
      data[idx + 2] = Math.min(255, color.b * luminance);
      
      // Adjust based on undertone
      adjustUndertone(data, idx, undertone);
    }
  }
  
  return imageData;
}

// Adjust color based on undertone
function adjustUndertone(
  data: Uint8ClampedArray,
  idx: number,
  undertone: string
): void {
  // Undertone adjustments
  switch (undertone.toLowerCase()) {
    case 'warm':
      data[idx] = Math.min(255, data[idx] * 1.1);     // Increase red
      data[idx + 2] = Math.max(0, data[idx + 2] * 0.9); // Decrease blue
      break;
    case 'cool':
      data[idx] = Math.max(0, data[idx] * 0.9);     // Decrease red
      data[idx + 2] = Math.min(255, data[idx + 2] * 1.1); // Increase blue
      break;
    case 'neutral':
      // No adjustment needed
      break;
  }
}
