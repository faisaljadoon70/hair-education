import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as tf from '@tensorflow/tfjs';
import { loadHairSegmentationModel } from '@/lib/models/hairSegmentation';
import { ColorProcessor } from '@/lib/color/processor';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';
import { useErrorBoundary } from '@/hooks/useErrorBoundary';

interface HairColorTryOnProps {
  shadeCard: Array<{
    name: string;
    color: string;
    undertone: string;
  }>;
}

export const HairColorTryOn: React.FC<HairColorTryOnProps> = ({ shadeCard }) => {
  // Advanced state management
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [segmentation, setSegmentation] = useState<tf.Tensor | null>(null);
  const [selectedColor, setSelectedColor] = useState(shadeCard[0]);
  const [processing, setProcessing] = useState(false);

  // Refs for canvas manipulation
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Custom hooks for optimization and error handling
  const { deviceCapabilities, optimizeProcessing } = useDeviceOptimization();
  const { error, captureError, clearError } = useErrorBoundary();

  // File upload handling with react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 5242880, // 5MB
    onDrop: handleImageDrop,
  });

  // Initialize models and processors
  useEffect(() => {
    const initializeModels = async () => {
      try {
        await loadHairSegmentationModel();
        await ColorProcessor.initialize();
      } catch (err) {
        captureError('Failed to initialize models');
      }
    };
    initializeModels();
  }, []);

  // Handle image upload
  async function handleImageDrop(acceptedFiles: File[]) {
    clearError();
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setProcessing(true);
      const img = await loadImage(file);
      setImage(img);
      await processImage(img);
    } catch (err) {
      captureError('Failed to process image');
    } finally {
      setProcessing(false);
    }
  }

  // Process image with segmentation and initial preview
  async function processImage(img: HTMLImageElement) {
    try {
      // Optimize processing based on device capabilities
      const processingConfig = optimizeProcessing({
        width: img.width,
        height: img.height,
        deviceType: deviceCapabilities.type
      });

      // Perform hair segmentation
      const segmentationResult = await performSegmentation(img, processingConfig);
      setSegmentation(segmentationResult);

      // Initialize canvases
      initializeCanvases(img);
      
      // Generate initial preview
      await updateColorPreview(segmentationResult, selectedColor);
    } catch (err) {
      captureError('Error during image processing');
    }
  }

  // Update color preview when selection changes
  useEffect(() => {
    if (segmentation && selectedColor) {
      updateColorPreview(segmentation, selectedColor);
    }
  }, [selectedColor]);

  // Render preview with new color
  async function updateColorPreview(
    segmentation: tf.Tensor,
    color: typeof selectedColor
  ) {
    if (!previewCanvasRef.current) return;

    try {
      const ctx = previewCanvasRef.current.getContext('2d');
      if (!ctx) return;

      // Apply color transformation
      await ColorProcessor.applyColor({
        canvas: previewCanvasRef.current,
        segmentation,
        color: color.color,
        undertone: color.undertone,
      });
    } catch (err) {
      captureError('Failed to update color preview');
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center 
          ${processing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} disabled={processing} />
        <p className="text-lg">Drop your photo here or click to select</p>
        <p className="text-sm text-gray-500 mt-2">
          Supports JPG, PNG (max 5MB)
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Processing Indicator */}
      {processing && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2">Processing your image...</p>
        </div>
      )}

      {/* Preview Area */}
      {image && (
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Original</h3>
            <canvas
              ref={originalCanvasRef}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <canvas
              ref={previewCanvasRef}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Color Selection */}
      {image && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Select Hair Color</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {shadeCard.map((shade) => (
              <button
                key={shade.name}
                onClick={() => setSelectedColor(shade)}
                className={`p-2 rounded-lg transition-all ${
                  selectedColor.name === shade.name
                    ? 'ring-2 ring-blue-500 scale-105'
                    : ''
                }`}
              >
                <div
                  className="w-full h-12 rounded-md mb-2"
                  style={{ backgroundColor: shade.color }}
                />
                <p className="text-sm text-center truncate">{shade.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Utility function to load image
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// Initialize canvases with image
function initializeCanvases(img: HTMLImageElement) {
  const canvases = [originalCanvasRef.current, previewCanvasRef.current];
  canvases.forEach(canvas => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  });
}

// Perform hair segmentation
async function performSegmentation(
  img: HTMLImageElement,
  config: any
): Promise<tf.Tensor> {
  const model = await loadHairSegmentationModel();
  return model.segment(img, config);
}
