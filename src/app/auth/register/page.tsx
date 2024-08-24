'use client'
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaUniversity, FaGraduationCap, FaLock, FaIdCard } from 'react-icons/fa';
import Link from 'next/link';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        aishe: '',
        degree: '',
        password: '',
        rollNo: '',
        type: 'student',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.remove();

        const { name, email, aishe, degree, password, rollNo, type } = formData;

        if (name.length <= 3) return toast.error('Invalid Name Length');
        if (email.length <= 3) return toast.error('Invalid Email Length');
        if (aishe.length <= 3) return toast.error('Invalid AISHE Code');
        if (password.length <= 7) return toast.error('Password should be at least 8 characters long');
        if (type === 'student') {
            if (!degree) return toast.error('Degree is required');
            if (isNaN(Number(rollNo))) return toast.error('Invalid Roll Number');
        }

        toast.loading('Processing Request...');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            toast.dismiss();

            if (response.ok) {
                if (type === 'student') {
                    toast.success('Check your email for verification');
                } else {
                    toast.success('Check your email for verification\nContact Project Cloud for Institutional Verification');
                }
            } else {
                toast.error(result.error || 'An error occurred');
            }
        } catch {
            toast.dismiss();
            toast.error('Server Error. Please try again later');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 -mt-8  md:-mt-10">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl transform transition-all hover:scale-105">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Join Project Cloud
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Create your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={formData.type === 'student' ? 'Your name' : 'College name'}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={formData.type === 'student' ? 'Your email' : 'College email'}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUniversity className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="aishe"
                                name="aishe"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="aishe code of institute"
                                value={formData.aishe}
                                onChange={handleChange}
                            />
                        </div>
                        {formData.type === 'student' && (
                            <>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaGraduationCap className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <select
                                        id="degree"
                                        name="degree"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={formData.degree}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select your degree</option>
                                        <option value="UG">Undergraduate</option>
                                        <option value="PG">Postgraduate</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Doctorate">Doctorate</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaIdCard className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="rollNo"
                                        name="rollNo"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Your roll number"
                                        value={formData.rollNo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password (Case Sensitive)"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center">
                            <input
                                id="student"
                                name="type"
                                type="radio"
                                value="student"
                                checked={formData.type === 'student'}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor="student" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                Student
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="institute"
                                name="type"
                                type="radio"
                                value="institute"
                                checked={formData.type === 'institute'}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor="institute" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                Institute
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
