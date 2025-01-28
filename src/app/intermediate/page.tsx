'use client';

import HomeButton from '@/components/HomeButton';

export default function IntermediatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <HomeButton />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Application & Techniques</h1>
        <p className="text-lg text-gray-600 mb-8">
          Perfect your application skills and master professional techniques.
          For stylists who understand the basics and are ready to advance their expertise.
        </p>

        {/* Module 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Module 1: Hair Analysis & Preparation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Porosity Analysis</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Low Porosity: Tightly closed cuticles, resists color</li>
                <li>Medium Porosity: Ideal for coloring, even absorption</li>
                <li>High Porosity: Quick absorption, needs pre-treatment</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Hair Texture</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Fine: Delicate strands, easily damaged</li>
                <li>Medium: Average thickness, most common</li>
                <li>Coarse: Strong strands, longer processing time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Module 2: Mixing & Measurement</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Developer Selection</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>10 Volume: No lift, deposit only</li>
                <li>20 Volume: 1-2 levels of lift</li>
                <li>30 Volume: 2-3 levels of lift</li>
                <li>40 Volume: 3-4 levels of lift (use with caution)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Safe Practices</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Always wear protective gloves</li>
                <li>Work in well-ventilated areas</li>
                <li>Perform patch tests 24-48 hours before</li>
                <li>Use precise measurements for consistent results</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Module 3: Application Techniques</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Basic Techniques</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Full head application methods</li>
                <li>Root touch-up techniques</li>
                <li>Grey coverage strategies</li>
                <li>Proper sectioning and timing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Course Features */}
        <div className="bg-purple-600 text-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Professional Resources</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Hands-on Practice
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Real-world Scenarios
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Professional Techniques
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Safety Guidelines
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
