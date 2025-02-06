'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MobileHeader from '../navigation/MobileHeader';
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';

export default function MobileSignIn() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/');
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader />
      
      <main className="flex-1 px-4 pt-16 pb-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 flex items-center text-gray-600 active:text-gray-800"
          onClick={() => router.push('/')}
        >
          <IoArrowBack className="mr-1" />
          <span className="text-sm">Back to Home</span>
        </motion.button>

        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className="mt-2 text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Sign in to continue your learning journey
            </motion.p>
          </div>
          
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#ec4899',
                    brandAccent: '#db2777',
                    inputBackground: 'white',
                    inputBorder: '#e5e7eb',
                    inputText: '#374151',
                    inputLabelText: '#6b7280'
                  },
                  radii: {
                    borderRadiusButton: '0.75rem',
                    buttonBorderRadius: '0.75rem',
                    inputBorderRadius: '0.75rem'
                  },
                  space: {
                    inputPadding: '0.75rem',
                    buttonPadding: '0.75rem'
                  },
                  fonts: {
                    bodyFontFamily: 'inherit',
                    buttonFontFamily: 'inherit',
                    inputFontFamily: 'inherit'
                  }
                }
              },
              className: {
                container: 'w-full space-y-4',
                button: 'w-full rounded-xl shadow-sm active:scale-[0.98] transition-transform duration-150',
                input: 'w-full rounded-xl border-gray-200 bg-white shadow-sm focus:border-pink-500 focus:ring-pink-500',
                label: 'text-sm font-medium text-gray-700',
                loader: 'border-pink-500'
              }
            }}
            providers={[]}
            showLinks={false}
            redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
            view="sign_in"
          />
        </motion.div>
      </main>
    </div>
  );
}
