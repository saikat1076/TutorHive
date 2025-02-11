import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="text-center p-8 bg-white rounded-lg opacity-90 w-full">
        {/* Image with DaisyUI Card component */}
        <div className="mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
            alt="Error Illustration"
            className="mx-auto"
          />
        </div>

        {/* Using motion from framer-motion to animate the text */}
        <motion.h2
          className="text-6xl font-bold text-red-500 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Oops!!!!
        </motion.h2>

        <motion.h2
          className="text-4xl font-extrabold text-blue-500 mt-4 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          404 Page Not Found
        </motion.h2>

        <p className="mt-6 text-lg text-gray-600">It seems you've hit a dead-end. Please go back or try again.</p>

        {/* DaisyUI button for navigation */}
        <div className="mt-6">
          <Link to={'/'} className="btn btn-primary">Go Back</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
