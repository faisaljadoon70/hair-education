'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuth } = useAuth();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear local auth state
      clearAuth();
      
      // Clear any stored data
      localStorage.clear();
      
      // Navigate to sign in
      router.push('/auth/signin');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white">
      {/* Top Bar */}
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2"
          >
            <div className="flex flex-col space-y-1">
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </div>
            <span className="text-lg font-medium">Menu</span>
          </button>
          {pathname !== '/' && (
            <Link href="/" className="ml-4 text-lg font-medium">
              Home
            </Link>
          )}
        </div>

        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={`bg-white/20 px-4 py-1.5 rounded-md text-sm font-medium 
            ${isSigningOut ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'}`}
        >
          {isSigningOut ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-14 bg-white z-50">
          <nav className="flex flex-col h-full">
            <div className="flex-1">
              <div className="py-2">
                <Link
                  href="/"
                  className={`flex items-center px-4 py-3 ${
                    pathname === '/' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <span className="font-medium">Home</span>
                </Link>
                <Link
                  href="/beginner"
                  className={`flex items-center px-4 py-3 ${
                    pathname === '/beginner' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <span className="font-medium">Beginner</span>
                </Link>
                <Link
                  href="/intermediate"
                  className={`flex items-center px-4 py-3 ${
                    pathname === '/intermediate' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <span className="font-medium">Intermediate</span>
                </Link>
                <Link
                  href="/expert"
                  className={`flex items-center px-4 py-3 ${
                    pathname === '/expert' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <span className="font-medium">Expert</span>
                </Link>
                <Link
                  href="/contact"
                  className={`flex items-center px-4 py-3 ${
                    pathname === '/contact' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <span className="font-medium">Contact</span>
                </Link>
                <Link
                  href="/color-wheel"
                  className={`flex items-center px-4 py-3 ${
                    pathname === '/color-wheel' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <span className="font-medium">Color Wheel</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
