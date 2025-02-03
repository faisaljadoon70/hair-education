'use client'

import React, { useState } from 'react'
import { useDevice } from '@/hooks/useDevice'
import { DeviceErrorBoundary } from './DeviceErrorBoundary'

export function DeviceCapabilitiesTest() {
  const {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    screenSize,
    network,
    browserFeatures
  } = useDevice()

  const [touchCount, setTouchCount] = useState(0)

  // Touch event handler test
  const handleTouch = () => {
    setTouchCount(prev => prev + 1)
  }

  return (
    <DeviceErrorBoundary>
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Device Capabilities Test</h2>
        
        {/* Device Type Information */}
        <section className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Device Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>Device Type:</div>
            <div className="font-medium">{deviceType}</div>
            <div>Is Mobile:</div>
            <div className="font-medium">{isMobile ? 'Yes' : 'No'}</div>
            <div>Is Tablet:</div>
            <div className="font-medium">{isTablet ? 'Yes' : 'No'}</div>
            <div>Is Desktop:</div>
            <div className="font-medium">{isDesktop ? 'Yes' : 'No'}</div>
          </div>
        </section>

        {/* Touch Capabilities */}
        <section className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Touch Capabilities</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>Touch Supported:</div>
            <div className="font-medium">{isTouch ? 'Yes' : 'No'}</div>
          </div>
          
          <div 
            className="w-full h-32 bg-blue-100 rounded flex items-center justify-center cursor-pointer"
            onTouchStart={handleTouch}
          >
            Touch here to test ({touchCount} touches)
          </div>
        </section>

        {/* Screen Information */}
        <section className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Screen Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>Width:</div>
            <div className="font-medium">{screenSize.width}px</div>
            <div>Height:</div>
            <div className="font-medium">{screenSize.height}px</div>
            <div>Orientation:</div>
            <div className="font-medium">{screenSize.orientation}</div>
          </div>
        </section>

        {/* Network Information */}
        <section className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Network Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>Connection Type:</div>
            <div className="font-medium">{network.type}</div>
            <div>Data Saver:</div>
            <div className="font-medium">{network.saveData ? 'On' : 'Off'}</div>
            <div>Metered Connection:</div>
            <div className="font-medium">
              {network.isMetered === undefined ? 'Unknown' : network.isMetered ? 'Yes' : 'No'}
            </div>
          </div>
        </section>

        {/* Browser Features */}
        <section className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Browser Features</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>WebP Support:</div>
            <div className="font-medium">{browserFeatures.webp ? 'Yes' : 'No'}</div>
            <div>Service Worker:</div>
            <div className="font-medium">{browserFeatures.serviceWorker ? 'Yes' : 'No'}</div>
          </div>
        </section>

        {/* Responsive Layout Test */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Responsive Layout Test</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-red-100 rounded">Mobile First</div>
            <div className="hidden md:block p-4 bg-green-100 rounded">Tablet+</div>
            <div className="hidden lg:block p-4 bg-blue-100 rounded">Desktop Only</div>
          </div>
        </section>
      </div>
    </DeviceErrorBoundary>
  )
}
