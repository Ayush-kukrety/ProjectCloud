'use client'
import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import Image from "next/image";

interface Project {
  created_at: string;
  description: string;
  id: number;
  project_id: string;
  title: string;
  cover: string;
  verified: boolean;
}

const View: React.FC = () => {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const { data } = await response.json();
          setProjects(data);
          setFilteredProjects(data);
        } else {
          const { error } = await response.json();
          throw new Error(error);
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
    );
    setFilteredProjects(filtered);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-4 lg:p-8"
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
        <p className="text-center text-2xl font-bold">All Projects</p>
      </motion.section>

      <motion.section
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex justify-center">
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <input
              id='searchIp'
              type="text"
              className="w-full h-14 border-2 border-indigo-300 dark:border-indigo-700 rounded-full text-lg p-4 pr-12 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-800"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={handleSearch}
            />
            <BiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-500 text-2xl" />
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h3 className="text-4xl font-semibold text-red-500 mb-4">No Projects Found</h3>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map(({ project_id, id, description, title, created_at, cover }) => (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => router.push(`/projects/${project_id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${cover}`}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-bold mb-2 line-clamp-1">{title}</h5>
                  <p className="text-base line-clamp-2 mb-4">{description}</p>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <p>{format(new Date(created_at), 'dd MMM yyyy')}</p>
                    <p>22 Views</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default View;
