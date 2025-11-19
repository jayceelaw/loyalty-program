import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CSC309 App',
  description: 'CSC309 project frontend',
}

// no navigation bar
export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> 
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
