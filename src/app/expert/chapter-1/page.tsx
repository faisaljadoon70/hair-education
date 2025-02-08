'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Chapter1Page() {
  const topics = [
    {
      title: "Color Wheel",
      description: "Master the fundamentals of color theory and relationships",
      path: "/advanced-level-wheel",
      icon: "🎨"
    },
    {
      title: "Shade Card",
      description: "Comprehensive professional shade system and formulation",
      path: "/expert/shade-card",
      icon: "🎯"
    },
    {
      title: "Advanced Formulation",
      description: "Learn complex color formulation techniques",
      path: "/expert/formulation",
      icon: "⚗️"
    },
    {
      title: "Color Correction",
      description: "Master professional color correction methods",
      path: "/expert/correction",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Chapter 1: Advanced Hair Techniques</h1>
        <p className="text-gray-600 mb-8">Master professional color formulation and advanced techniques</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={topic.path}>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="text-3xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
