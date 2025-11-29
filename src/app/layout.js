import './globals.css';
import { ReduxProvider } from './providers';

export const metadata = {
  title: 'Next School - Student Management',
  description: 'A complete student management system with MongoDB and RTK Query',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
