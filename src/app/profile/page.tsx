'use client';

import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Student from './student';
import Institute from './institute';

const Profile = () => {
    const router = useRouter();
    const { student, institute } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!student.logged && !institute.logged) {
            router.replace('/');
        }
    }, [student.logged, institute.logged, router]);

    if (student.logged) {
        return <Student />;
    }

    if (institute.logged) {
        return <Institute/>;
    }

    return null;
}

export default Profile;