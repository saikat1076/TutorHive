import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/10 rounded-full -top-48 -left-48"
        animate={{
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-blue-500/10 rounded-full -bottom-32 -right-32"
        animate={{
          y: [0, -100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 text-center p-8 bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 max-w-2xl w-full">
        {/* Animated 404 image */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="mb-8"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5743/5743180.png"
            alt="Error Illustration"
            className="mx-auto w-48 h-48 hover:scale-110 transition-transform duration-300"
          />
        </motion.div>

        {/* Animated text elements */}
        <motion.h2
          className="text-9xl font-black bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h2>

        <motion.h3
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page Lost in Space
        </motion.h3>

        <motion.p
          className="text-xl text-white/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          The page you're looking for has been abducted by aliens or<br />
          lost in a black hole. Don't worry, we'll beam you back home!
        </motion.p>

        {/* Glowing button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link 
            to="/" 
            className="inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_5px_rgba(99,102,241,0.5)] 
                      relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 animate-bounce-horizontal" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
              </svg>
              Beam Me Home
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 animate-bounce-horizontal-reverse" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Subtle floating animation for the whole container */}
        <motion.div 
          className="absolute inset-0 rounded-3xl border-2 border-purple-500/30 pointer-events-none"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ErrorPage;