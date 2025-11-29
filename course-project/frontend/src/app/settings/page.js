'use client';

import { useRouter } from 'next/navigation';
import SettingsPanel from '../components/SettingsPanel';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const { initializing, token } = useAuth();

  useEffect(() => {
      if (!initializing && !token) {
          router.replace('/login');
      }
  }, [initializing])

  return <SettingsPanel />;
}