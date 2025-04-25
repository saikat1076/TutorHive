import { FaSearch, FaUserCheck, FaChalkboardTeacher } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-br from-white via-blue-50 to-purple-100">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover your ideal tutor with ease in just three simple steps.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          {[{
            icon: <FaSearch />,
            title: "1. Search for Tutors",
            description: "Explore a variety of qualified tutors by subject, rating, and availability.",
            color: "text-blue-500",
          }, {
            icon: <FaUserCheck />,
            title: "2. Book a Session",
            description: "Pick the perfect time and book instantly with your chosen tutor.",
            color: "text-purple-500",
          }, {
            icon: <FaChalkboardTeacher />,
            title: "3. Start Learning",
            description: "Join the session and enjoy personalized 1-on-1 learning online.",
            color: "text-green-500",
          }].map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="rounded-2xl p-8 bg-white/60 shadow-lg backdrop-blur-md border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`text-5xl mb-6 ${step.color}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
