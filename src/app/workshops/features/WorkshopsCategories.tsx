import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CategoryProps {
    title: string;
    description: string;
}

interface WorkshopSectionProps {
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

const FeatureCard: React.FC<CategoryProps> = ({ title, description }) => (
    <motion.div
        className='w-full min-h-[7rem] shadow-lg py-4 border-l-4 border-red-700 dark:border-yellow-500 pl-4'
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

const WorkshopSection: React.FC<WorkshopSectionProps> = ({ title, items, imageSrc }) => (
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

const WorkshopsCategories: React.FC = () => {
    const categories: CategoryProps[] = [
        { title: "Technical Workshops", description: "Engage in workshops covering a variety of technical topics, including electronics, programming, and mechanics." },
        { title: "Soft Skills Workshops", description: "Participate in workshops designed to enhance essential soft skills such as communication, leadership, and teamwork." }
    ];

    const features: CategoryProps[] = [
        { title: "Materials", description: "Access to all workshop materials, including slides, documents, and additional resources." },
        { title: "Recordings", description: "Watch recordings of past workshops and catch up on any sessions you missed." },
        { title: "Certificates", description: "Receive certificates of participation for each workshop you complete." },
        { title: "Feedback", description: "Provide feedback to help us improve future workshops and make them more engaging." }
    ];

    const workshops: WorkshopSectionProps[] = [
        {
            title: "Electronics",
            items: [
                "Discover and participate in a range of electronics workshops and projects.",
                "Learn about the latest technologies and designs in the electronics field.",
                "Collaborate with peers and contribute to innovative electronic engineering solutions.",
                "Explore practical applications and enhance your skills through hands-on workshops."
            ],
            imageSrc: "/images/electronics.png"
        },
        {
            title: "Programming",
            items: [
                "Engage in programming workshops focusing on various languages and techniques.",
                "Share your coding projects and gain insights from the programming community.",
                "Explore new programming paradigms and enhance your coding skills.",
                "Contribute to innovative programming solutions and collaborate with others."
            ],
            imageSrc: "/images/languages.png"
        },
        {
            title: "Mechanics",
            items: [
                "Explore mechanical engineering workshops and projects created by your peers.",
                "Participate in hands-on activities and learn about mechanical design and innovation.",
                "Address real-world challenges through collaborative projects and solutions.",
                "Contribute to the field of mechanical engineering and share your insights with others."
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
                    Workshop Categories
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

            <section>
                <motion.p
                    className="text-lg md:text-xl font-semibold text-center text-red-700 dark:text-yellow-500 mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Workshop Features
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex justify-center items-center"
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: index * 0.1 }}
                        >
                            <FeatureCard {...feature} />
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
                    Workshops On
                </motion.p>
                {workshops.map((workshop, index) => (
                    <React.Fragment key={index}>
                        <WorkshopSection {...workshop} />
                        {index < workshops.length - 1 && (
                            <div className="border-b-2 border-gray-300 dark:border-gray-600 w-3/4 my-12"></div>
                        )}
                    </React.Fragment>
                ))}
            </section>
        </motion.div>
    );
};

export default WorkshopsCategories;