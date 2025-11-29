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
     currentInterface === 'manager' || currentInterface === 'superuser' ? <RegisterForm /> : 
    currentInterface ? <div className='main-container'>403 Forbidden</div>: <div className='spinner'></div>

  );
}