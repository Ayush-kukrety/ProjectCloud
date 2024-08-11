// SearchResult.tsx
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from '@/utils/hooks/useDebounce';


interface Workshop {
    title: string;
    description: string;
    link: string;
    cover: string;
    created_at: string;
}

interface Props {
    keyword: string;
}

const SearchResult: React.FC<Props> = ({keyword}) => {
    const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const searchParams = useSearchParams();
    const debouncedKeyword = useDebounce(keyword, 500);

    useEffect(() => {
        const fetchWorkshops = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(`/api/workshops/search?keyword=${debouncedKeyword}`);
                const { filteredWorkshops, error } = await response.json();
                if (error) throw new Error();
                setFilteredWorkshops(filteredWorkshops);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (debouncedKeyword) {
            fetchWorkshops();
        } else {
            setFilteredWorkshops([]);
            setLoading(false);
        }
    }, [debouncedKeyword]);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='pt-5 px-5 md:px-10'
        >
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <AnimatePresence>
                    {error || filteredWorkshops.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <h3 className="text-4xl font-semibold text-red-500 mb-4">No Workshops Found</h3>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredWorkshops.map(({ description, title, created_at, cover, link }) => (
                                <motion.article
                                    key={created_at}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/workshops/${cover}`}
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
                                            <a className="text-primary-purple hover:underline" href={link} target='_blank' rel="noreferrer">
                                                Visit
                                            </a>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </motion.main>
    );
};

export default SearchResult;
