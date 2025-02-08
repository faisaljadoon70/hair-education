import MobileBeginnerContainer from '@/components/mobile/containers/MobileBeginnerContainer';

export default function BeginnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileBeginnerContainer>{children}</MobileBeginnerContainer>;
}
