'use client';

import { redirect } from 'next/navigation';

export default function MobileLevelWheelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
