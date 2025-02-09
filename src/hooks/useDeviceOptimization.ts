import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  type: 'mobile' | 'tablet' | 'desktop';
  gpu: boolean;
  memory: 'low' | 'medium' | 'high';
  processingPower: 'low' | 'medium' | 'high';
}

interface ProcessingConfig {
  width: number;
  height: number;
  deviceType: DeviceCapabilities['type'];
}

export function useDeviceOptimization() {
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities>({
    type: 'desktop',
    gpu: true,
    memory: 'high',
    processingPower: 'high',
  });

  useEffect(() => {
    detectDeviceCapabilities();
  }, []);

  async function detectDeviceCapabilities() {
    try {
      // Detect device type
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isTablet = /iPad|Android/.test(navigator.userAgent) && 
                      !/Mobile/.test(navigator.userAgent);
      
      // Check GPU availability
      const hasGPU = await checkGPUSupport();
      
      // Estimate memory
      const memory = estimateMemory();
      
      // Estimate processing power
      const processingPower = estimateProcessingPower();

      setDeviceCapabilities({
        type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        gpu: hasGPU,
        memory,
        processingPower,
      });
    } catch (error) {
      console.error('Error detecting device capabilities:', error);
    }
  }

  function optimizeProcessing(config: ProcessingConfig) {
    const { width, height, deviceType } = config;
    
    // Base configuration
    const baseConfig = {
      width,
      height,
      quality: 'high' as const,
      batchSize: 1,
    };

    // Adjust based on device capabilities
    if (deviceType === 'mobile' || deviceCapabilities.memory === 'low') {
      // Reduce quality for mobile or low memory devices
      return {
        ...baseConfig,
        width: Math.min(width, 512),
        height: Math.min(height, 512),
        quality: 'medium' as const,
      };
    }

    if (!deviceCapabilities.gpu || deviceCapabilities.processingPower === 'low') {
      // Reduce quality for devices without GPU or low processing power
      return {
        ...baseConfig,
        width: Math.min(width, 768),
        height: Math.min(height, 768),
        quality: 'medium' as const,
      };
    }

    return baseConfig;
  }

  return {
    deviceCapabilities,
    optimizeProcessing,
  };
}

// Helper functions
async function checkGPUSupport(): Promise<boolean> {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function estimateMemory(): DeviceCapabilities['memory'] {
  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory;
    if (memory <= 2) return 'low';
    if (memory <= 4) return 'medium';
    return 'high';
  }
  return 'medium';
}

function estimateProcessingPower(): DeviceCapabilities['processingPower'] {
  try {
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    if (hardwareConcurrency <= 2) return 'low';
    if (hardwareConcurrency <= 4) return 'medium';
    return 'high';
  } catch {
    return 'medium';
  }
}
