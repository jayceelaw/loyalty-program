import NavBar from './components/CondNavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CSC309 App',
  description: 'CSC309 project frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            <NotificationProvider>
              <NavBar/>
              {children}
            </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
