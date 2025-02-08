'use client';

import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import MobileHeader from '../navigation/MobileHeader';
import dynamic from 'next/dynamic';

const MobileLevelWheel = dynamic(() => import('../components/MobileLevelWheel'), {
  ssr: false
});

export default function MobileLevelWheelPage() {
  const [selectedView, setSelectedView] = useState('Wheel View');

  return (
    <>
      <MobileHeader isHomePage={false} />
      <main className="flex-1 px-4 pt-16">
        {/* Top buttons - smaller size */}
        <div className="flex gap-2 mb-4">
          <button className="bg-pink-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-pink-600">
            Advanced Mode
          </button>
          <button className="border border-gray-300 text-sm px-3 py-1 rounded-lg hover:bg-gray-50">
            Shade Card
          </button>
        </div>

        {/* View Selection Dropdown */}
        <Menu as="div" className="relative mb-4">
          <Menu.Button className="flex items-center justify-between w-full text-sm px-3 py-1 border rounded-lg hover:bg-gray-50">
            {selectedView}
            <ChevronDownIcon className="h-4 w-4 ml-2" />
          </Menu.Button>
          <Menu.Items className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedView('Mix Colors')}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    Mix Colors
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedView('Wheel View')}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    Wheel View
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedView('List View')}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    List View
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>

        {/* Wheel will be rendered here */}
        <div className="mt-4">
          {selectedView === 'Wheel View' && <MobileLevelWheel />}
        </div>
      </main>
    </>
  );
}
