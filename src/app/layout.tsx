import { headers } from 'next/headers';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { TutorialProvider } from '@/context/TutorialContext';
import Script from 'next/script';

export const metadata = {
  title: 'Professional Hair Education',
  description: 'Master the art and science of hair coloring through our comprehensive education platform.',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hair Education',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get device type from headers (set by middleware)
  const headersList = headers();
  const deviceType = headersList.get('x-device-type') || 'desktop';

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="x-device-type" content={deviceType} />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <TutorialProvider>
            <div className="min-h-screen bg-gray-50">
              {children}
            </div>
          </TutorialProvider>
        </AuthProvider>
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
