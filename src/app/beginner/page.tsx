'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import HomeButton from '@/components/HomeButton';

export default function BeginnerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-8">
        <HomeButton />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Foundations of Hair Color</h1>
          <p className="text-lg text-gray-600 mb-8">
            Master the fundamentals of hair coloring through our comprehensive beginner course.
            Perfect for individuals with little to no prior knowledge of hair color.
          </p>

          {/* Module 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Module 1: Hair & Scalp Structure</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Hair Strand Structure</h3>
                <p className="text-gray-600 mb-2">Think of a hair strand like a pencil:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Cuticle: Outer protective layer, like paint on a pencil</li>
                  <li>Cortex: Middle layer containing pigment, like pencil wood</li>
                  <li>Medulla: Innermost layer, like pencil lead</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Hair Growth Cycles</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Anagen Phase (Growth): Active growth, 2-7 years</li>
                  <li>Catagen Phase (Transition): 2-3 weeks</li>
                  <li>Telogen Phase (Resting): 3 months</li>
                  <li>Exogen Phase (Shedding): Natural hair fall</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Module 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Module 2: The Color Wheel</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Color Theory Basics</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Primary Colors: Red, blue, and yellow</li>
                  <li>Secondary Colors: Green, orange, and purple</li>
                  <li>Tertiary Colors: Red-orange, blue-green, etc.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Color Relationships</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Complementary: Opposite colors neutralize each other</li>
                  <li>Analogous: Adjacent colors create harmony</li>
                  <li>Triadic: Three evenly spaced colors for balance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Module 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Module 3: Hair Levels</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Level System</h3>
                <p className="text-gray-600 mb-2">Hair levels range from 1 (black) to 10 (lightest blonde)</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Level 1: Black</li>
                  <li>Level 4: Dark brown</li>
                  <li>Level 7: Medium blonde</li>
                  <li>Level 10: Lightest blonde</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Course Features */}
          <div className="bg-pink-600 text-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Interactive 3D Models
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Visual Demonstrations
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Practice Quizzes
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Hands-on Exercises
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
