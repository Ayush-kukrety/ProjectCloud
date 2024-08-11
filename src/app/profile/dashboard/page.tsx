'use client'
import UnderDevelopment from '@/components/under-development';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Dashboard = () => {
    const router = useRouter();
    const { student, institute } = useAppSelector((state: RootState) => state.auth);
  
    useEffect(() => {
      if (!student.logged && !institute.logged) {
        router.replace('/');
      }
    }, [student.logged, institute.logged]);
  
    if (student.logged) {
      router.replace('/profile');
    }
  
    if (institute.logged) {
      return <UnderDevelopment />;
    }
  
}

export default Dashboard