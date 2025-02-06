'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { GiGraduateCap, GiScissors } from 'react-icons/gi';
import { AiFillStar, AiOutlineMail } from 'react-icons/ai';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import '@/styles/mobile.css';

export default function MobileHomeNavigation() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      setIsMenuOpen(false);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-14 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <div className="flex items-center space-x-3">
            {user && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-lg hover:bg-white/10 rounded-md px-3 py-2 transition-colors touch-feedback"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="flex flex-col space-y-1">
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
                <span>Menu</span>
              </button>
            )}
          </div>

          {!user ? (
            <Link
              href="/auth/signin"
              className="bg-white/25 text-white px-4 py-2 rounded-md shadow-sm touch-feedback text-sm font-medium"
            >
              Sign In
            </Link>
          ) : null}
        </div>
      </header>

      {/* Mobile Menu */}
      {user && isMenuOpen && (
        <div 
          className="fixed inset-0 top-14 bg-white z-50 mobile-menu-enter"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <nav className="flex flex-col h-full">
            {/* User Info Section */}
            <div className="px-4 py-3 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium truncate max-w-[200px]">
                  {user.email}
                </span>
                <button
                  onClick={async () => {
                    try {
                      await supabase.auth.signOut();
                      window.location.href = '/auth/signin';
                    } catch (error) {
                      console.error('Error signing out:', error);
                    }
                  }}
                  className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-md text-sm font-medium touch-feedback"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-2">
                {[
                  { href: '/beginner', icon: <GiGraduateCap />, text: 'Beginner' },
                  { href: '/intermediate', icon: <GiScissors />, text: 'Intermediate' },
                  { href: '/expert', icon: <AiFillStar />, text: 'Expert' },
                  { href: '/contact', icon: <AiOutlineMail />, text: 'Contact' },
                  { href: '/color-wheel', icon: '🎨', text: 'Color Wheel' }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 touch-feedback"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-xl text-pink-600 w-8">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Swipe Hint */}
            <div className="py-4 px-4 text-center text-sm text-gray-400 border-t bg-gray-50">
              Swipe left to close menu
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
