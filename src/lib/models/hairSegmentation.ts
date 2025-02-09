import * as tf from '@tensorflow/tfjs';

class HairSegmentationModel {
  private model: tf.GraphModel | null = null;
  private static instance: HairSegmentationModel;

  private constructor() {}

  static getInstance(): HairSegmentationModel {
    if (!HairSegmentationModel.instance) {
      HairSegmentationModel.instance = new HairSegmentationModel();
    }
    return HairSegmentationModel.instance;
  }

  async initialize(): Promise<void> {
    if (this.model) return;

    try {
      // Load the model
      this.model = await tf.loadGraphModel(
        '/models/hair_segmentation/model.json'
      );
      
      // Warm up the model
      const dummyInput = tf.zeros([1, 256, 256, 3]);
      await this.model.predict(dummyInput);
      dummyInput.dispose();
    } catch (error) {
      console.error('Error initializing hair segmentation model:', error);
      throw error;
    }
  }

  async segment(
    image: HTMLImageElement,
    config: { width: number; height: number }
  ): Promise<tf.Tensor> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }

    try {
      // Convert image to tensor
      const tensor = tf.browser.fromPixels(image);
      
      // Resize to model input size
      const resized = tf.image
        .resizeBilinear(tensor, [256, 256])
        .expandDims(0)
        .toFloat()
        .div(255.0);

      // Run inference
      const prediction = this.model.predict(resized) as tf.Tensor;
      
      // Post-process the prediction
      const processed = tf.sigmoid(prediction);
      
      // Resize back to original size
      const resizedMask = tf.image.resizeBilinear(
        processed,
        [config.height, config.width]
      );

      // Cleanup
      tensor.dispose();
      resized.dispose();
      prediction.dispose();
      processed.dispose();

      return resizedMask;
    } catch (error) {
      console.error('Error during hair segmentation:', error);
      throw error;
    }
  }

  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
  }
}

// Export singleton instance
export const loadHairSegmentationModel = async (): Promise<HairSegmentationModel> => {
  const model = HairSegmentationModel.getInstance();
  await model.initialize();
  return model;
};
