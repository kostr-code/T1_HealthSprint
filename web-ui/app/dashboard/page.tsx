'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../utils/supabase';
import { checkAdminRole } from '../utils/supabase';
import LogoutButton from '../components/LogoutButton';
import AdminDashboard from '../components/AdminDashboard';
import GuestDashboard from '../components/GuestDashboard';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGuest = searchParams.get('guest') === 'true';
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isGuest) {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const adminStatus = await checkAdminRole();
      setIsAdmin(adminStatus);
      setLoading(false);
    };

    checkAuth();
  }, [router, isGuest]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">
              {isAdmin ? 'Панель администратора' : isGuest ? 'Гостевой доступ' : 'Панель управления'}
            </h1>
            {!isGuest && <LogoutButton />}
            {isGuest && (
              <button
                onClick={() => router.push('/login')}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isAdmin ? (
            <AdminDashboard />
          ) : isGuest ? (
            <GuestDashboard />
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-600">Добро пожаловать в личный кабинет!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}