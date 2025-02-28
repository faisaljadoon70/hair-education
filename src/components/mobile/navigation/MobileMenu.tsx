'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
}

const menuItems = [
  { name: 'Beginner', href: '/beginner' },
  { name: 'Intermediate', href: '/intermediate' },
  { name: 'Expert', href: '/expert' },
  { name: 'Hair Level System', href: '/level-wheel' },
  { name: 'Contact', href: '/contact' },
  { name: 'Color Wheel', href: '/color-wheel' },
];

export function MobileMenu({ isOpen, onClose, currentPage }: MobileMenuProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    {/* User Info */}
                    <div className="px-4 sm:px-6 mb-8">
                      <div className="text-pink-600 font-medium">SIGNED IN AS</div>
                      <div className="text-gray-900">faisal.7h@yahoo.com</div>
                    </div>

                    {/* Menu Items */}
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <nav className="flex flex-col gap-4">
                        {menuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-3 py-2 text-base ${
                              currentPage === item.name
                                ? 'text-pink-600 bg-pink-50'
                                : 'text-gray-700 hover:bg-gray-50'
                            } rounded-md`}
                            onClick={onClose}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <button
                          onClick={onClose}
                          className="flex items-center px-3 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md mt-4"
                        >
                          Sign Out
                        </button>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
