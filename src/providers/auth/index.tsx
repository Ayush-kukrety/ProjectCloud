'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { instituteLogin, studentLogin } from '@/lib/feature/auth/authSlice';
import ServerDown from '@/components/server-down';


interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth');
        const { authenticated, user, error } = await response.json();
        if (response.ok) {
          if (authenticated) {
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
          }
        } else {
          throw new Error(error);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchAuthStatus();
  }, [dispatch]);


  if (error) {
    return <ServerDown />;
  }

  return <>{children}</>;
};
