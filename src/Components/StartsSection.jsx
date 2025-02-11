import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaStar, FaLanguage, FaUsers } from "react-icons/fa";

const Stats = () => {
  const [counts, setCounts] = useState({
    tutors: 0,
    reviews: 0,
    languages: 0,
    users: 0,
  });

  const fakeData = {
    tutors: 9,
    reviews: 10,
    languages: 9,
    users: 2,
  };

  useEffect(() => {
    const interval = 30;
    const duration = 5000;
    const steps = duration / interval;
    const increment = {
      tutors: Math.ceil(fakeData.tutors / steps),
      reviews: Math.ceil(fakeData.reviews / steps),
      languages: Math.ceil(fakeData.languages / steps),
      users: Math.ceil(fakeData.users / steps),
    };

    const animate = setInterval(() => {
      setCounts((prevCounts) => {
        const nextCounts = {
          tutors: Math.min(prevCounts.tutors + increment.tutors, fakeData.tutors),
          reviews: Math.min(prevCounts.reviews + increment.reviews, fakeData.reviews),
          languages: Math.min(prevCounts.languages + increment.languages, fakeData.languages),
          users: Math.min(prevCounts.users + increment.users, fakeData.users),
        };

        if (
          nextCounts.tutors === fakeData.tutors &&
          nextCounts.reviews === fakeData.reviews &&
          nextCounts.languages === fakeData.languages &&
          nextCounts.users === fakeData.users
        ) {
          clearInterval(animate);
        }

        return nextCounts;
      });
    }, interval);

    return () => clearInterval(animate);
  }, []);

  const stats = [
    { icon: <FaChalkboardTeacher />, label: "Total Tutors", value: counts.tutors },
    { icon: <FaStar />, label: "5 Star Reviews", value: counts.reviews },
    { icon: <FaLanguage />, label: "Languages", value: counts.languages },
    { icon: <FaUsers />, label: "Total Users", value: counts.users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-[#E0F7FF] rounded-lg shadow-md">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-5xl text-blue-600 mb-4">{stat.icon}</div>
          <h3 className="text-3xl font-semibold">
            {stat.value}+
          </h3>
          <p className="text-gray-600 font-semibold text-xl">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;
