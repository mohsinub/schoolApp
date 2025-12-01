import './globals.css';
import { ReduxProvider } from './providers';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Next School - Student Management',
  description: 'A complete student management system with MongoDB and RTK Query',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
