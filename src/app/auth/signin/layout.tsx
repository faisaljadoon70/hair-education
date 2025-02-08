'use client';

import MobileAuthContainer from '@/components/mobile/containers/MobileAuthContainer';

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileAuthContainer>{children}</MobileAuthContainer>;
}
