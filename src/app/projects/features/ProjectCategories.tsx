import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CategoryProps {
    title: string;
    description: string;
}

interface ProjectSectionProps {
    title: string;
    items: string[];
    imageSrc: string;
}

const cardVariants: Variants = {
    hover: { scale: 1.05 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

const CategoryCard: React.FC<CategoryProps> = ({ title, description }) => (
    <motion.div 
        className='w-full md:w-3/4 min-h-[7rem] shadow-lg py-4 border-l-4 border-red-700 dark:border-yellow-500 pl-4'
        variants={cardVariants}
        whileHover="hover"
        initial="initial"
        animate="animate"
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <p className="text-red-700 dark:text-yellow-500 font-semibold text-sm md:text-base">{title}</p>
        <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm mt-2">{description}</p>
    </motion.div>
);

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, items, imageSrc }) => (
    <motion.div 
        className="w-full flex flex-col md:flex-row items-center justify-center gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="w-full md:w-1/2">
            <p className="text-center md:text-left text-xl md:text-2xl font-semibold mb-5 text-red-700 dark:text-yellow-500">{title}</p>
            <ul className="text-sm md:text-base px-5 md:px-0 list-disc list-inside text-gray-700 dark:text-gray-300">
                {items.map((item, index) => (
                    <motion.li 
                        key={index}
                        className="mb-2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </div>
        <motion.img 
            className="h-48 w-48 md:h-72 md:w-72 lg:h-96 lg:w-96 object-cover rounded-lg shadow-lg"
            src={imageSrc} 
            alt={title}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
        />
    </motion.div>
);

const ProjectCategories: React.FC = () => {
    const categories: CategoryProps[] = [
        { title: "Hardware Projects", description: "Explore diverse projects covering various technical domains, including electronics, computer, and mechanics." },
        { title: "Software Projects", description: "Showcase projects that develop essential programming skills in electronics, information technology and mechanics" }
    ];

    const projects: ProjectSectionProps[] = [
        {
            title: "Electronics",
            items: [
                "Engage with a range of electronics projects focusing on innovative solutions.",
                "Learn about the latest advancements in electronics through hands-on projects.",
                "Collaborate with peers on challenging electronics projects and share your knowledge.",
                "Explore practical applications and enhance your electronics skills through project-based learning."
            ],
            imageSrc: "/images/electronics.png"
        },
        {
            title: "Computer Science",
            items: [
                "Explore a variety of computer science projects that focus on programming, data structures, and algorithms.",
                "Share your coding projects and gain insights from others in the computer science community.",
                "Enhance your coding skills by working on real-world projects and tackling complex problems.",
                "Collaborate with peers on cutting-edge computer science projects and contribute to the field."
            ],
            imageSrc: "/images/languages.png"
        },
        {
            title: "Mechanical Engineering",
            items: [
                "Participate in mechanical engineering projects that address real-world challenges.",
                "Engage in hands-on activities and learn about innovative mechanical design.",
                "Collaborate on mechanical projects that push the boundaries of engineering.",
                "Contribute to the field of mechanical engineering through project-based learning and exploration."
            ],
            imageSrc: "/images/mechanical.png"
        }
    ];

    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <section className="mt-5">
                <motion.p 
                    className="text-lg md:text-xl font-semibold text-center text-red-700 dark:text-yellow-500 mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Project Categories
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category, index) => (
                        <motion.div 
                            key={index} 
                            className="flex justify-center items-center"
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: index * 0.1 }}
                        >
                            <CategoryCard {...category} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="flex justify-center my-12">
                <hr className="w-3/4 border-gray-300 dark:border-gray-600" />
            </div>

            <section className="flex flex-col items-center">
                <motion.p 
                    className="text-lg md:text-xl font-semibold text-center text-red-700 dark:text-yellow-500 mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Projects In
                </motion.p>
                {projects.map((project, index) => (
                    <React.Fragment key={index}>
                        <ProjectSection {...project} />
                        {index < projects.length - 1 && (
                            <div className="border-b-2 border-gray-300 dark:border-gray-600 w-3/4 my-12"></div>
                        )}
                    </React.Fragment>
                ))}
            </section>
        </motion.div>
    );
}

export default ProjectCategories;
