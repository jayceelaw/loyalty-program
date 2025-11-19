import '../globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../../context/AuthContext';
import { TransactionProvider } from '@/context/TransactionContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CSC309 App',
  description: 'CSC309 project frontend',
}

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TransactionProvider>
                {children}
          </TransactionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
