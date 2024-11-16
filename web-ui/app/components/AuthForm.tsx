'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';
import Link from 'next/link';

type AuthFormProps = {
  type: 'login' | 'register';
};

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGuestAccess = () => {
    router.push('/dashboard?guest=true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { data: { user }, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        if (user) {
          await supabase
            .from('user_roles')
            .insert([{ user_id: user.id, role: 'user' }]);
        }
      }
      
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Пароль"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Или</span>
        </div>
      </div>

      <button
        onClick={handleGuestAccess}
        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Войти как гость
      </button>

      <div className="text-sm text-center">
        {type === 'login' ? (
          <p>
            Нет аккаунта?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-500">
              Зарегистрироваться
            </Link>
          </p>
        ) : (
          <p>
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Войти
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}