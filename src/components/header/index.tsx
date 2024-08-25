'use client';

import { BiLogIn } from 'react-icons/bi';
import { FiMenu, FiX } from 'react-icons/fi';
import { setDarkMode, toggleTheme } from '@/lib/feature/theme/themeSlice'; // Corrected path
import { useEffect, useState } from 'react';
import { RootState } from '@/lib/store'; // Corrected path
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import PopupChatBot from '../bot/index';

const Header = () => {
    const darkMode = useAppSelector((state: RootState) => state.theme.darkMode);
    const studentLogged = useAppSelector((state: RootState) => state.auth.student.logged);
    const instituteLogged = useAppSelector((state: RootState) => state.auth.institute.logged);
    const adminLogged = useAppSelector((state: RootState) => state.admin.logged);
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDarkMode = () => {
        dispatch(toggleTheme());
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
            dispatch(setDarkMode(JSON.parse(savedTheme)));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {

        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { to: '/', text: 'Home' },
        { to: '/projects', text: 'Projects' },
        { to: '/workshops', text: 'Profile' },
        
        { to: '/about', text: 'About' },
        ...(studentLogged || instituteLogged ? [{ to: '/profile', text: 'Profile' }] : []),
        ...(adminLogged ? [{ to: '/admin', text: 'Admin' }] : []),
    ];

    return (
        <nav className="sticky z-20 top-0 shadow-lg bg-lightTheme-primary text-lightTheme-text dark:bg-darkTheme-primary dark:text-white">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link href='/' className="flex items-center space-x-2">
                        <Image
                            width={96}
                            height={56}
                            className="hidden md:flex w-24 h-14"
                            src={darkMode ? "/logos/logo-dark.png" : "/logos/logo-light.png"}
                            alt="Logo"
                        />
                        <span className="text-3xl  font-bold font-serif">Project Cloud</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                href={link.to}
                                className="hover:bg-sky-300 dark:hover:bg-purple-700 py-2 px-3 rounded-md transition-colors duration-200"
                            >
                                {link.text}
                            </Link>
                        ))}

                        {!(adminLogged || studentLogged || instituteLogged) && (
                            <Link
                                href='/auth/login'
                                className="py-2 px-4 hover:bg-green-500 rounded-md transition-colors duration-200 flex items-center space-x-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Login</span>
                                <BiLogIn size={20} />
                            </Link>
                        )}

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            <Image
                                height={24}
                                width={24}
                                className="h-6 w-6"
                                src={darkMode ? "/svg/sun.svg" : "/svg/moon.svg"}
                                alt={darkMode ? "Light mode" : "Dark mode"}
                            />
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                    
                   
                </div>

                {isOpen && (
                    <div className="md:hidden mt-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                href={link.to}
                                className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.text}
                            </Link>
                        ))}

                        {!(adminLogged || studentLogged || instituteLogged) && (
                            <Link
                                href='/auth/login'
                                className="py-2 px-4 hover:bg-green-500 rounded-md transition-colors duration-200 flex items-center space-x-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Login</span>
                                <BiLogIn size={20} />
                            </Link>
                        )}

                        <button
                            onClick={() => {
                                toggleDarkMode();
                                setIsOpen(false);
                            }}
                            className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                            <Image
                                height={20}
                                width={20}
                                className="h-5 w-5"
                                src={darkMode ? "/svg/sun.svg" : "/svg/moon.svg"}
                                alt={darkMode ? "Light mode" : "Dark mode"}
                            />
                        </button>
                        
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;