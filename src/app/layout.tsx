import './globals.css';
import AuthButton from '@/components/AuthButton';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="relative min-h-screen">
            <div className="absolute top-4 right-4">
              <AuthButton />
            </div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
