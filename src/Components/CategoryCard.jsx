import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://tutor-hive-sever.vercel.app/category');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/find-tutors/${category.title}`);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Explore Our Tutoring Categories
            </h2>
            
            <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {categories.map((category) => {
                    const IconComponent = Icons[category.icon];
                    
                    return (
                        <motion.div
                            key={category._id}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCategoryClick(category)}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    {IconComponent && (
                                        <div className="p-3 rounded-lg bg-pink-50">
                                            <IconComponent 
                                                size={24} 
                                                className="text-pink-500" 
                                            />
                                        </div>
                                    )}
                                    <FaArrowRight 
                                        size={16} 
                                        className="text-gray-400 group-hover:text-pink-500 transition-colors" 
                                    />
                                </div>
                                
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {category.title}
                                </h3>
                                
                                <p className="text-gray-500 text-sm flex-grow">
                                    {category.description || 'Expert tutors available in this category'}
                                </p>
                                
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        {category.tutorCount || '50+'} Tutors
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                                        Popular
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default CategoryCard;