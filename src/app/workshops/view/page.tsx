'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { BiArrowBack, BiSearch } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/loader';

interface Workshop {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  views: number;
  link: string;
  cover: string;
}

const View: React.FC = () => {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/workshops`);
        if (response.ok) {
          const { workshops } = await response.json();
          setWorkshops(workshops);
          setFilteredWorkshops(workshops);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkshops();
  }, [searchTerm]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = workshops.filter(workshop =>
      workshop.title.toLowerCase().includes(term) ||
      workshop.description.toLowerCase().includes(term)
    );
    setFilteredWorkshops(filtered);
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='px-10 pt-3 bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text min-h-screen'
    >
      <motion.section
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 py-3 rounded-lg shadow relative mb-5"
      >
        <button className='absolute top-3 left-3 bottom-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors' onClick={() => router.back()} aria-label="Go back">
          <BiArrowBack size={25} />
        </button>
        <p className="text-center text-2xl font-bold">All Workshops</p>
      </motion.section>

      <motion.section
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="my-8"
      >
        <div className="flex justify-center">
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <input
              type="text"
              className="w-full h-14 border-2 border-indigo-300 dark:border-indigo-700 rounded-full text-lg p-4 pr-12 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-800"
              placeholder="Search by title, description, or category"
              value={searchTerm}
              onChange={handleSearch}
            />
            <BiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-500 text-2xl" />
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pt-2 grid md:grid-cols-2 gap-4"
        >
          {filteredWorkshops.map((workshop) => (
            <motion.article
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.03 }}
              className=' border-2 border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md'
            >
              <a href={workshop.link} 
              className='grid md:grid-cols-2'
              target='_blank'
              >
                <div className="md:order-2">
                  <Image height={500} width={500} className="w-full h-auto object-cover rounded-lg" src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/workshops/${workshop.cover}`} alt="Workshop" />
                </div>
                <div className="md:order-1">
                  <div className="card-body">
                    <h5 className="text-2xl font-semibold mb-2">{workshop.title}</h5>
                    <p className="text-lg mb-2">{workshop.description}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-1"><small>{workshop.category}</small></p>
                    <p className="text-gray-700 dark:text-gray-300"><small>{workshop.date}</small></p>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.section>
      </AnimatePresence>
    </motion.div>
  );
};

export default View;
