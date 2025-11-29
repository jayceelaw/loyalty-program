'use client';

import { useRouter } from 'next/navigation';
import RegisterForm from '../../components/RegisterForm';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function RegisterPage() {

  const router = useRouter();
  const { initializing, token, currentInterface } = useAuth();

  useEffect(() => {
      if (!initializing && !token) {
          router.replace('/login');
      }
  }, [initializing])

  return (
    <div className='main-container'>
         {currentInterface === 'manager' || currentInterface === 'superuser' ? <RegisterForm /> : 
        currentInterface ? "403 Forbidden" : <div className='spinner'></div>}
    </div>
  );
}