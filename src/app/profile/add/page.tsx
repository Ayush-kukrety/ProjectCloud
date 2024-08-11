'use client';

import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AddProject from '../student/add-project';
import AddWorkshop from '../institute/add-workshop';

const Add = () => {
  const router = useRouter();
  const { student, institute } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!student.logged && !institute.logged) {
      router.replace('/');
    }
  }, [student.logged, institute.logged, router]);

  if (student.logged) {
    return <AddProject />;
  }

  if (institute.logged) {
    return <AddWorkshop />;
  }

}

export default Add;