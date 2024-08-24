'use client'
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setDarkMode } from '@/lib/feature/theme/themeSlice';
import { RootState } from '@/lib/store';

const index: React.FC = () => {

    


    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-5 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-800 shadow-lg rounded-b-3xl"
            >
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-3xl lg:text-4xl  font-[sura] text-red-600 dark:text-red-400"
                        >
                            <h2>&lt;WelCome to Project Cloud /&gt;</h2>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center md:justify-start"

                        >
                            <span className="border-b-2 border-current w-40 mt-2"></span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-lg lg:text-xl font-serif mt-2"
                        >
                            <p>We are glad, You're Here</p>
                            <p></p>
                        </motion.div>
                    </div>
                    <div className='flex justify-center'>
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="hidden md:flex justify-center h-60"
                            src="/svg/innovation.svg"
                            alt="inovation"
                        />

                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="md:hidden flex justify-center"
                            src="/svg/learning.svg"
                            alt="inovation"
                        />
                    </div>

                </div>

            </motion.section>
            <motion.section
                className="container mx-auto py-16 px-4 md:px-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    
                    <h2 className="text-red-700 dark:text-yellow-500 text-3xl md:text-4xl font-bold mt-2">Platform Made for Students by Students</h2>
                </motion.div>
                <motion.div
                    className="grid md:grid-cols-3 gap-8 text-lg"

                    initial="hidden"
                    animate="visible"
                >
                    {[
                        { title: "1k+ Institutes", description: "An ever-growing number of institutes pan India." },
                        { title: "2.5k+ Students", description: "Students Enrolled for Project Cloud Initiative." },
                        { title: "5k+ Projects", description: "A Huge Database of Projects on Various Subjects" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm shadow-lg rounded-lg py-6 px-6 border-l-4 border-red-700 dark:border-yellow-500"

                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <p className="text-red-700 dark:text-yellow-500 font-semibold text-xl mb-2">{item.title}</p>
                            <p>{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href='/auth/login'
                            className="flex items-center gap-2 font-medium text-lg py-3 px-6 bg-purple-700 text-white hover:bg-purple-800 transition-colors rounded-full shadow-lg hover:shadow-xl"
                        >
                            Get Started <FaArrowRightLong />
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.section>
        </main>
    );
};

export default index;