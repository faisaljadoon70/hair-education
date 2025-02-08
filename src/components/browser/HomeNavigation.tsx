'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function BrowserHomeNavigation() {
  const { user, clearAuth } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

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
    <>
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          {!user ? (
            <div className="ml-auto">
              <Link
                href="/auth/signin"
                className="bg-white/25 text-white px-4 py-2 rounded-md shadow-sm hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <nav className="bg-pink-500 text-white">
                <div className="container mx-auto px-4">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                      <Link href="/" className="flex items-center space-x-2">
                        <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
                        <span className="font-bold">Home</span>
                      </Link>

                      <Link href="/beginner" className="hover:text-white/90">
                        Beginner
                      </Link>

                      <Link href="/intermediate" className="hover:text-white/90">
                        Intermediate
                      </Link>

                      <Link href="/expert" className="hover:text-white/90">
                        Expert
                      </Link>

                      <Link href="/contact" className="hover:text-white/90">
                        Contact
                      </Link>

                      <Link href="/level-wheel" className="hover:text-white/90">
                        Hair Level System
                      </Link>

                      <Link href="/shade-card" className="hover:text-white/90">
                        Shade Card
                      </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-white/90">{user.email}</span>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className={`bg-white/25 px-4 py-1 rounded-md shadow-md transition-all duration-200
                          ${isSigningOut 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:-translate-y-0.5 hover:bg-white/30'}`}
                      >
                        {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      {user && (
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-2 text-sm">
              <span className="text-gray-500">You are here: </span>
              <Link href="/" className="text-pink-600 hover:text-pink-700">
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
