'use client';

import HomeButton from '@/components/HomeButton';

export default function ExpertPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <HomeButton />
      <h1 className="text-4xl font-bold text-center mb-8">Expert Level</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Advanced Techniques & Problem Solving</h2>
          <div className="space-y-4">
            <ModuleSection
              title="Module 1: Advanced Color Formulation"
              topics={[
                "Complex color formulation",
                "Creative color techniques",
                "Custom formula creation",
                "Trend adaptation"
              ]}
            />
            <ModuleSection
              title="Module 2: Advanced Techniques"
              topics={[
                "Advanced balayage techniques",
                "Creative highlighting methods",
                "Color correction mastery",
                "Artistic color placement"
              ]}
            />
            <ModuleSection
              title="Module 3: Business Excellence"
              topics={[
                "Salon management",
                "Advanced client relationships",
                "Marketing strategies",
                "Team leadership"
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function ModuleSection({ title, topics }: { title: string; topics: string[] }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-xl font-medium mb-3 text-pink-600">{title}</h3>
      <ul className="list-disc pl-6 space-y-2">
        {topics.map((topic, index) => (
          <li key={index} className="text-gray-700">{topic}</li>
        ))}
      </ul>
    </div>
  );
}
