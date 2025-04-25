import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { 
  FaChalkboardTeacher, 
  FaStar, 
  FaLanguage, 
  FaUsers,
  FaGlobeAmericas,
  FaAward,
  FaUserGraduate,
  FaBookOpen
} from "react-icons/fa";

const Stats = () => {
  const [counts, setCounts] = useState({
    tutors: 0,
    reviews: 0,
    languages: 0,
    users: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const statsRef = useRef(null);

  const statsData = [
    { 
      icon: <FaChalkboardTeacher className="text-4xl" />, 
      label: "Expert Tutors", 
      value: 250,
      color: "from-blue-500 to-blue-600",
      iconColor: "text-blue-100"
    },
    { 
      icon: <FaStar className="text-4xl" />, 
      label: "5★ Reviews", 
      value: 4280,
      color: "from-amber-500 to-amber-600",
      iconColor: "text-amber-100"
    },
    { 
      icon: <FaLanguage className="text-4xl" />, 
      label: "Languages", 
      value: 15,
      color: "from-emerald-500 to-emerald-600",
      iconColor: "text-emerald-100"
    },
    { 
      icon: <FaUsers className="text-4xl" />, 
      label: "Happy Students", 
      value: 3200,
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-100"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          animateCounts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [controls]);

  const animateCounts = () => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounts({
        tutors: Math.floor(progress * statsData[0].value),
        reviews: Math.floor(progress * statsData[1].value),
        languages: Math.floor(progress * statsData[2].value),
        users: Math.floor(progress * statsData[3].value),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div ref={statsRef} className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Impact in Numbers
          </h2>
          <p className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of learners who have transformed their skills with our expert tutors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={statVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-xl overflow-hidden`}
            >
              <div className="px-6 py-4 text-center">
                <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/10 ${stat.iconColor} mb-6`}>
                  {stat.icon}
                </div>
                <motion.p 
                  className="text-5xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {Object.values(counts)[index]}+
                </motion.p>
                <p className="text-lg font-medium text-white/90">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <FaGlobeAmericas className="text-2xl" />, text: "Global Community" },
            { icon: <FaAward className="text-2xl" />, text: "Certified Experts" },
            { icon: <FaUserGraduate className="text-2xl" />, text: "Personalized Learning" },
            { icon: <FaBookOpen className="text-2xl" />, text: "Diverse Courses" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={isVisible ? { 
                opacity: 1,
                transition: { delay: 0.8 + index * 0.1 }
              } : {}}
              className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm"
            >
              <div className="text-blue-600">{item.icon}</div>
              <span className="text-gray-700 font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;