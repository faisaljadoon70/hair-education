'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabNavigation() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Level Wheel', path: '/level-wheel' },
    { name: 'Color Mixing', path: '/color-mixing' },
    { name: 'Formula Builder', path: '/formula-builder' },
    { name: 'Reverse Formula', path: '/reverse-formula' },
    { name: 'Color Prediction', path: '/color-prediction' },
    { name: 'Lifting Process', path: '/lifting-process' },
  ];

  return (
    <div className="mb-6">
      <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
