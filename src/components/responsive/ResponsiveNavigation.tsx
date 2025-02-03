'use client';

import React, { useState } from 'react';
import { useDevice } from '@/hooks/useDevice';
import { useAuth } from '@/context/AuthContext';
import { useTutorial } from '@/context/TutorialContext';
import Link from 'next/link';
import { supabase } from '@/utils/supabase-client';

interface NavItem {
  label: string;
  href: string;
  requiresAuth?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Beginner', href: '/beginner', requiresAuth: true },
  { label: 'Intermediate', href: '/intermediate', requiresAuth: true },
  { label: 'Expert', href: '/expert', requiresAuth: true },
  { label: 'Contact', href: '/contact' },
];

export function ResponsiveNavigation() {
  const { isMobile } = useDevice();
  const { user } = useAuth();
  const { progress } = useTutorial();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter nav items based on auth status
  const filteredNavItems = navItems.filter(
    item => !item.requiresAuth || (item.requiresAuth && user)
  );

  const MobileMenu = () => (
    <div className="lg:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <span className="sr-only">Open menu</span>
        {/* Hamburger icon */}
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg py-2">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const DesktopMenu = () => (
    <nav className="hidden lg:flex space-x-8">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Hair Education
            </Link>
          </div>

          {isMobile ? <MobileMenu /> : <DesktopMenu />}

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {user.email}
                </div>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
