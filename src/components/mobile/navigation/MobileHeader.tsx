'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { supabase } from '@/utils/supabase-client';
import { 
  PiGraduationCap, 
  PiBookOpenText, 
  PiCertificate,
  PiEnvelope,
  PiPalette
} from 'react-icons/pi';

interface MobileHeaderProps {
  isHomePage?: boolean;
}

export default function MobileHeader({ isHomePage = false }: MobileHeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/signin');
    toggleMenu();
  };

  const navigateTo = (path: string) => {
    router.push(path);
    toggleMenu();
  };

  return (
    <>
      {/* Semi-transparent overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={toggleMenu}
        />
      )}

      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-pink-400 h-12 flex items-center px-4 z-50 shadow-sm">
        <button
          onClick={toggleMenu}
          className="p-1.5 text-white/90 hover:text-white active:scale-95 transition-all duration-200"
          aria-label="Menu"
        >
          <IoMdMenu size={22} />
        </button>
      </header>

      {/* Mobile Menu - Full navigation */}
      <div 
        className={`fixed top-0 left-0 h-screen bg-white z-50 transform transition-transform duration-200 ease-out shadow-lg ${
          isMenuOpen ? 'translate-x-0 slide-in-left' : '-translate-x-full'
        }`}
      >
        <div className="w-64 pt-14 pb-4 h-full flex flex-col">
          {session ? (
            <>
              {/* User Email Section */}
              <div className="px-4 py-3 border-b border-gray-100 bg-pink-50">
                <span className="text-xs font-medium text-pink-600 uppercase tracking-wider">Signed in as</span>
                <div className="mt-1 text-sm font-medium text-gray-900 truncate">{session.user.email}</div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 mt-2 overflow-y-auto">
                <button
                  onClick={() => navigateTo('/beginner')}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 transition-colors duration-150"
                >
                  <PiGraduationCap className="w-5 h-5 mr-3 text-pink-500" />
                  <span className="text-sm font-medium">Beginner</span>
                </button>

                <button
                  onClick={() => navigateTo('/intermediate')}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 transition-colors duration-150"
                >
                  <PiBookOpenText className="w-5 h-5 mr-3 text-pink-500" />
                  <span className="text-sm font-medium">Intermediate</span>
                </button>

                <button
                  onClick={() => navigateTo('/expert')}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 transition-colors duration-150"
                >
                  <PiCertificate className="w-5 h-5 mr-3 text-pink-500" />
                  <span className="text-sm font-medium">Expert</span>
                </button>

                <button
                  onClick={() => navigateTo('/contact')}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 transition-colors duration-150"
                >
                  <PiEnvelope className="w-5 h-5 mr-3 text-pink-500" />
                  <span className="text-sm font-medium">Contact</span>
                </button>

                <button
                  onClick={() => navigateTo('/color-wheel')}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 transition-colors duration-150"
                >
                  <PiPalette className="w-5 h-5 mr-3 text-pink-500" />
                  <span className="text-sm font-medium">Color Wheel</span>
                </button>

                {/* Sign Out at the bottom */}
                <div className="border-t border-gray-100 mt-auto">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 transition-colors duration-150"
                  >
                    <FiLogOut className="w-5 h-5 mr-3 text-pink-500" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </nav>
            </>
          ) : (
            // Not signed in - show sign in button
            <nav className="mt-2">
              <button
                onClick={() => navigateTo('/auth/signin')}
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-pink-50 active:bg-pink-100 transition-colors duration-150"
              >
                <FiUser className="w-5 h-5 mr-3 text-pink-500" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
