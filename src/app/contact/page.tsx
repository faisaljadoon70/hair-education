'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ProtectedRoute>
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <a
            href="/"
            className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
            aria-label="Go to home page"
          >
            <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
            <span className="text-lg">Home</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-14" role="navigation" aria-label="Main navigation">
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Home page"
            >
              Home
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/beginner"
              onClick={(e) => { e.preventDefault(); handleNavigation('/beginner'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
            >
              Beginner
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/intermediate"
              onClick={(e) => { e.preventDefault(); handleNavigation('/intermediate'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
            >
              Intermediate
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/expert"
              onClick={(e) => { e.preventDefault(); handleNavigation('/expert'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Expert courses"
            >
              Expert
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}
              className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md"
              aria-current="page"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-transform duration-200 transform origin-center" 
                 style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(2px, 8px)' : 'none' }}></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-200"
                 style={{ opacity: isMobileMenuOpen ? '0' : '1' }}></div>
            <div className="w-6 h-0.5 bg-white transition-transform duration-200 transform origin-center"
                 style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(2px, -8px)' : 'none' }}></div>
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <span className="text-white/90">faisal_70@yahoo.com</span>
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
            <button 
              className="text-white bg-gradient-to-r from-white/25 to-white/20 hover:from-white/30 hover:to-white/25 py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600"
              aria-label="Sign out of your account"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-pink-600 shadow-lg transform transition-transform duration-200 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="px-4 py-3 space-y-2">
            <a href="/" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Home</a>
            <a href="/beginner" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Beginner</a>
            <a href="/intermediate" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Intermediate</a>
            <a href="/expert" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Expert</a>
            <a href="/contact" className="block py-2 px-4 text-white bg-white/15 rounded-md">Contact</a>
            <div className="pt-2 mt-2 border-t border-white/10">
              <span className="block px-4 py-2 text-white/90 text-sm">{formData.email}</span>
              <button className="w-full mt-2 px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors">
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-pink-50 py-2 px-4 text-sm text-pink-700 -mt-2">
        <span className="text-gray-600">You are here: </span>
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }} className="text-pink-600 hover:text-pink-800">Home</a>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-pink-600">Contact</span>
      </div>

      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-2">Email:</span>
              <a href="mailto:info@haireducation.com" className="text-pink-600 hover:underline">
                info@haireducation.com
              </a>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-2">Phone:</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-2">Address:</span>
              <span>123 Hair Education Street, Beauty City, ST 12345</span>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
