import NavBar from './components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext';
import { TransactionProvider } from '@/context/TransactionContext';
import { NavigationProvider } from '@/context/NavigationContext';

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
          <TransactionProvider>
            <NavigationProvider>
              <NavBar/>
              {children}
            </NavigationProvider>
          </TransactionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
