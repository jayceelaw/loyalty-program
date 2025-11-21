'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './page.module.css';
import UserDashboardPage from './user/page';

export default function Root() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  if (initializing) { // cover page when loading
    return <div className={styles.loadingPage}></div>;
  }

  useEffect(() => {
    if (!initializing && !user) { // user not logged in
      router.replace('/login');
    }
  }, [user, initializing, router]);

  if (!user) return null;

  return <UserDashboardPage />; // TODO: change to home page
}
