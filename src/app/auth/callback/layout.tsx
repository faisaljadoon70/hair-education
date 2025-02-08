'use client';

import MobileCallbackContainer from '@/components/mobile/containers/MobileCallbackContainer';

export default function CallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileCallbackContainer>{children}</MobileCallbackContainer>;
}
