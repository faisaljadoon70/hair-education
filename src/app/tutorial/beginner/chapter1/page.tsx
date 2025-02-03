'use client';

import React from 'react';
import { TutorialContainer } from '@/components/tutorial/TutorialContainer';
import { TheoryStep } from '@/components/tutorial/TheoryStep';
import { useRouter } from 'next/navigation';

const steps = [
  {
    id: 'intro',
    title: 'Introduction to Hair Coloring',
    type: 'theory' as const,
    content: (
      <TheoryStep
        title="Understanding Hair Structure"
        content={`Hair coloring is both an art and a science. Before we begin our journey into the world of hair coloring, it's essential to understand the basic structure of hair.

Hair is made up of three main layers:
- The cuticle: The outer protective layer
- The cortex: The middle layer that contains the hair's natural pigment
- The medulla: The innermost layer

Understanding these components is crucial for successful hair coloring.`}
      />
    ),
  },
  {
    id: 'color-theory',
    title: 'Basic Color Theory',
    type: 'theory' as const,
    content: (
      <TheoryStep
        title="Color Wheel Basics"
        content={`Color theory is fundamental to hair coloring. The color wheel helps us understand:
- Primary colors
- Secondary colors
- Complementary colors
- Warm vs. cool tones

This knowledge will help you make informed decisions about color selection and mixing.`}
      />
    ),
  },
];

export default function BeginnerChapter1() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/tutorial/beginner/chapter2');
  };

  return (
    <div className="py-8">
      <TutorialContainer
        chapterId="beginner-1"
        steps={steps}
        onComplete={handleComplete}
      />
    </div>
  );
}
