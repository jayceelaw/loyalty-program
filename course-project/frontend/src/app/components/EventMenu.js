'use client';

import PrimaryActionDropDownButton from "./PrimaryActionDropDownButton";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext.jsx';

export default function EventMenu() {
  const router = useRouter();
  const { currentInterface } = useAuth();

  const menuOptions = [{ text: 'Events', action: () => router.push('/event') }];
  if (currentInterface === "manager" || currentInterface === "superuser") {
    menuOptions.push({ text: 'Create Event', action: () => router.push('/event/create') });
    menuOptions.push({ text: 'Update Event', action: () => router.push('/event/update') });
  }

  // if only 1 option, render it as a normal nav tab link
  if (menuOptions.length === 1) {
    return;
  }

  return <PrimaryActionDropDownButton options={menuOptions} />;
}
