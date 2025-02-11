import React from "react";
import { motion } from "framer-motion";



const Banner = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center pb-8">
      <motion.div
        className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="lg:text-6xl text-4xl font-bold">
            Getting <span className="text-blue-500">Quality</span> Education Is
            Now More <span className="text-blue-500">Easy</span>
          </h1>
          <p className="text-gray-600 mt-4">
            Provides you with the latest online learning system and material
            that help your knowledge growing.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">Get free trial</button>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0 relative">
            <img
              src="https://i.ibb.co.com/bQ4f2Dm/images.jpg" 
              alt="Student"
            />
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
