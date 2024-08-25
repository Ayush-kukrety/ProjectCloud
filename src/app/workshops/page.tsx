'use client'
import React, { useState, ChangeEvent } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SearchResult from './features/SearchResult';
import WorkshopsCategories from './features/WorkshopsCategories';
import Link from 'next/link';
import Image from 'next/image';

const Workshops: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [typed, setTyped] = useState<boolean>(false);

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const searchKeyword = e.target.value.trim();
        setKeyword(searchKeyword);
        setTyped(searchKeyword.length > 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-16 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-800 shadow-lg rounded-b-3xl"
            >
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg font-semibold text-red-500 dark:text-yellow-500"
                            >
                                Workshop Directory
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl font-bold mt-2 text-gray-900 dark:text-gray-100"
                            >
                                Stay Updated on Workshops
                            </motion.h1>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg leading-relaxed text-gray-600 dark:text-gray-300"
                        >
                            Stay informed about past and upcoming events, ensuring you&apos;re always ready to seize valuable opportunities in your area of interest.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative"
                        >
                            <input
                                onChange={handleSearchInput}
                                id='searchIp'
                                type="text"
                                className="w-full h-14 border-2 border-gray-300 dark:border-gray-700 rounded-full text-lg p-4 pr-12 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 bg-transparent"
                                placeholder="Search by Category or Subject"
                            />
                            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className='flex space-x-4'
                        >
                            <Link href='/workshops/view'>
                                <button className="mt-3 bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                    <span>View All Workshops</span>
                                    <FaArrowRight />
                                </button>
                            </Link>
                            <Link href='/workshops/view'>
                                <button className="mt-3 bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                    <span>Live Workshop</span>
                                    <FaArrowRight />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="hidden md:flex justify-center"
                    >
                        <Image className="w-full max-w-md" src="/svg/seminar.svg" alt="Seminar" height={500} width={500} />
                    </motion.div>
                </div>
                {typed && <SearchResult keyword={keyword} />}
            </motion.section>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="py-16 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
            >
                {!typed && <WorkshopsCategories />}
            </motion.div>
        </div>
    );
};

export default Workshops;