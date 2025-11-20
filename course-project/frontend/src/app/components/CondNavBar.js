'use client';

import { usePathname } from 'next/navigation';
import NavBar from './NavBar'; // adjust path

export default function CondNavBar({ children }) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith('/login'); // hide nav bar for login page

  return (
    <>
      {!hideNav && <NavBar />}
      {children}
    </>
  );
}
