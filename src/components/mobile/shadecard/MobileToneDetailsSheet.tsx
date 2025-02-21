'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ToneDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  toneNumber: string;
  name: string;
  hexColor: string;
  details?: {
    undertone: string;
    grayCoverage: string;
    hairTexture: string;
    porosityLevel: string;
    specialConsiderations: string;
    mixRatio: string;
    processingTime: string;
    developer: string;
  };
}

export default function MobileToneDetailsSheet({
  isOpen,
  onClose,
  toneNumber,
  name,
  hexColor,
  details = {
    undertone: 'Natural',
    grayCoverage: '100%',
    hairTexture: 'Medium to Coarse Hair',
    porosityLevel: 'Normal to High Porosity',
    specialConsiderations: 'Resistant Gray Hair, Color Longevity',
    mixRatio: '1:1.5',
    processingTime: '35-45 minutes',
    developer: '20 Vol'
  }
}: ToneDetailsSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl"
            style={{ maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: hexColor }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{name}</h2>
                  <p className="text-sm text-gray-500">Level {toneNumber}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1">
                <XMarkIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 76px)' }}>
              {/* Characteristics */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Characteristics</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-32">• Undertone:</span>
                    <span className="text-sm text-gray-900">{details.undertone}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-32">• Gray Coverage:</span>
                    <span className="text-sm text-gray-900">{details.grayCoverage}</span>
                  </div>
                </div>
              </div>

              {/* Best Suited For */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Best Suited For</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Hair Texture:</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-3.5">{details.hairTexture}</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Porosity Level:</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-3.5">{details.porosityLevel}</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Special Considerations:</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-3.5">{details.specialConsiderations}</p>
                  </div>
                </div>
              </div>

              {/* Formulation */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Formulation</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-32">• Mix Ratio:</span>
                    <span className="text-sm text-gray-900">{details.mixRatio}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-32">• Processing Time:</span>
                    <span className="text-sm text-gray-900">{details.processingTime}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-32">• Developer:</span>
                    <span className="text-sm text-gray-900">{details.developer}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
