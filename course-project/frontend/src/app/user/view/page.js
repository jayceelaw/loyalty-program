'use client';

import { useRouter } from 'next/navigation';
import UserView from '../../components/UserView';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function UserViewPage() {
  const router = useRouter();
  const { initializing, user, currentInterface } = useAuth();

  useEffect(() => {
      if (!initializing && !user) {
          router.replace('/login');
      }
  }, [initializing])

  return (
        currentInterface === 'manager' || currentInterface === 'superuser' ? <UserView /> : 
      currentInterface ? <div className='main-container'>403 Forbidden</div> : <div className='spinner'></div>
  );
}