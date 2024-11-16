'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      Выйти
    </button>
  );
}