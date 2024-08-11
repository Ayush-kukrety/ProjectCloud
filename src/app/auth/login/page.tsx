'use client'
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaUserGraduate } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import Link from 'next/link';
import { instituteLogin, studentLogin } from '@/lib/feature/auth/authSlice';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.loading('Logging In...');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    toast.dismiss();
    if (response.ok) {
      const { user } = await response.json();
      if (user.user_metadata.type === 'student') {
        dispatch(studentLogin({ details: { ...user.user_metadata, id: user.id } }));
      } else if (user.user_metadata.type === 'institute') {
        if (user.user_metadata.institutional_verification) {
          dispatch(instituteLogin({ details: { ...user.user_metadata, id: user.id } }));
        } else {
          await fetch('/api/auth/logout', {
            method: 'POST',
          });
        }
      }
      toast.success('Login Successful');
      router.push('/');
    } else {
      const { error } = await response.json();
      toast.error(error || 'An error occurred');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 -mt-7 md:-mt-10">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to Prayog
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Link href="/auth/register" className="flex items-center text-sm text-indigo-600 hover:text-indigo-500">
              <FaUserGraduate className="mr-1" />
              Register
            </Link>
          </div>
          <div className="text-sm">
            <Link href="#" className="flex items-center font-medium text-indigo-600 hover:text-indigo-500">
              <RiLockPasswordLine className="mr-1" />
              Forget Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;