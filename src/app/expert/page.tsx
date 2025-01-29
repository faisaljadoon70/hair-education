'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeButton from '@/components/HomeButton';
import { supabase } from '@/utils/supabase';

export default function ExpertPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/signin');
      }
    };
    
    checkUser();
  }, [router, supabase.auth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <HomeButton />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Advanced Techniques & Problem Solving</h1>
        <p className="text-lg text-gray-600 mb-8">
          Master advanced coloring techniques and complex problem-solving skills.
          For experienced stylists ready to take their expertise to the highest level.
        </p>

        {/* Module 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Module 1: Advanced Color Formulation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-700">Custom Color Mixing</h3>
              <p className="text-gray-600">Learn to create unique color formulations for any client need.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">Color Correction</h3>
              <p className="text-gray-600">Master complex color correction techniques.</p>
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Module 2: Business Management</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-700">Salon Operations</h3>
              <p className="text-gray-600">Learn effective salon management strategies.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">Client Relations</h3>
              <p className="text-gray-600">Build and maintain a loyal client base.</p>
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Module 3: Advanced Techniques</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-700">Balayage Mastery</h3>
              <p className="text-gray-600">Perfect your freehand coloring techniques.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">Creative Color Design</h3>
              <p className="text-gray-600">Create stunning, unique color patterns and designs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
