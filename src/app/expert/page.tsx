'use client';

import HomeButton from '@/components/HomeButton';

export default function ExpertPage() {
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
              <h3 className="text-xl font-medium text-gray-800 mb-2">Color Formulation Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Neutralizing: Use complementary colors</li>
                <li>Depth: Add darker base colors</li>
                <li>Dimension: Use multiple shades</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Underlying Pigments</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Level 1-3: Red undertones</li>
                <li>Level 4-6: Red-orange undertones</li>
                <li>Level 7-8: Orange-yellow undertones</li>
                <li>Level 9-10: Yellow undertones</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Module 2: Highlights & Balayage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Sectioning Techniques</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Horizontal: Traditional highlights</li>
                <li>Vertical: Balayage and ombre</li>
                <li>Diagonal: Movement and dimension</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Balayage Mastery</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Freehand painting techniques</li>
                <li>Seamless blending methods</li>
                <li>Strategic foil placement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Module 3: Color Correction</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Common Problems</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Brassiness from improper lightening</li>
                <li>Uneven color application</li>
                <li>Over-processed hair</li>
                <li>Color banding</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Module 4 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Module 4: Business Management</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Professional Development</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Client portfolio management</li>
                <li>Marketing and branding</li>
                <li>Team leadership skills</li>
                <li>Business growth strategies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Course Features */}
        <div className="bg-blue-600 text-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Advanced Resources</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Advanced Techniques
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Business Development
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Problem Solving
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Industry Innovation
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
