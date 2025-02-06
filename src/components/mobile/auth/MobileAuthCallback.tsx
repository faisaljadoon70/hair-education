'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MobileHeader from '../navigation/MobileHeader';
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function MobileAuthCallback() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get session from URL
        const { error } = await supabase.auth.getSession();
        if (error) throw error;

        // Redirect to home page
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
        router.push('/auth/signin');
      }
    };

    handleCallback();
  }, [router, supabase.auth]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <AiOutlineLoading3Quarters className="w-8 h-8 text-pink-500" />
          </motion.div>
          
          <motion.h2 
            className="mt-4 text-xl font-semibold text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Signing you in...
          </motion.h2>
          
          <motion.p 
            className="mt-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Just a moment while we get everything ready
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
