'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiGraduateCap, GiScissors } from 'react-icons/gi';
import { AiFillStar, AiOutlineMail } from 'react-icons/ai';
import { IoMdHome } from 'react-icons/io';
import { IoColorPaletteSharp } from 'react-icons/io5';

export default function MobileHomeNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="mobile-nav">
      <div className="grid grid-cols-3 gap-2">
        <Link
          href="/"
          className={`flex flex-col items-center p-2 rounded-lg touch-feedback
            ${isActive('/') ? 'text-pink-600' : 'text-gray-600'}`}
        >
          <IoMdHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/beginner"
          className={`flex flex-col items-center p-2 rounded-lg touch-feedback
            ${isActive('/beginner') ? 'text-pink-600' : 'text-gray-600'}`}
        >
          <GiGraduateCap size={24} />
          <span className="text-xs mt-1">Beginner</span>
        </Link>

        <Link
          href="/intermediate"
          className={`flex flex-col items-center p-2 rounded-lg touch-feedback
            ${isActive('/intermediate') ? 'text-pink-600' : 'text-gray-600'}`}
        >
          <GiScissors size={24} />
          <span className="text-xs mt-1">Intermediate</span>
        </Link>

        <Link
          href="/expert"
          className={`flex flex-col items-center p-2 rounded-lg touch-feedback
            ${isActive('/expert') ? 'text-pink-600' : 'text-gray-600'}`}
        >
          <AiFillStar size={24} />
          <span className="text-xs mt-1">Expert</span>
        </Link>

        <Link
          href="/contact"
          className={`flex flex-col items-center p-2 rounded-lg touch-feedback
            ${isActive('/contact') ? 'text-pink-600' : 'text-gray-600'}`}
        >
          <AiOutlineMail size={24} />
          <span className="text-xs mt-1">Contact</span>
        </Link>

        <Link
          href="/level-wheel"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/level-wheel') ? 'text-pink-600' : 'text-gray-600'}`}
        >
          <span className="text-2xl">🎨</span>
          <span className="text-xs">Level System</span>
        </Link>

        <Link
          href="/color-wheel"
          className={`flex flex-col items-center p-2 rounded-lg touch-feedback
            ${isActive('/color-wheel') ? 'text-pink-600' : 'text-gray-600'}`}
        >
          <IoColorPaletteSharp size={24} />
          <span className="text-xs mt-1">Color Wheel</span>
        </Link>
      </div>
    </nav>
  );
}
