import { motion, AnimatePresence } from "framer-motion";
import { MdStar, MdEmail } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const FindTutors = () => {
  // ... existing logic ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        {category ? `${category} Tutors` : "Discover Expert Tutors"}
      </motion.h1>

      {/* Enhanced Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 flex justify-center"
      >
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by language..."
            value={searchText}
            onChange={handleSearchChange}
            className="input input-lg w-full pl-12 pr-6 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-sm"
          />
          <FaSearch className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
        </div>
      </motion.div>

      {/* Tutors Grid */}
      <AnimatePresence>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredTutors.map((tutor) => (
            <motion.div
              key={tutor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Tutor Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={tutor.lecturer?.photo}
                      alt={tutor.lecturer?.userName}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 p-1 rounded-full">
                      <MdOutlineVerified className="text-white text-lg" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      {tutor.lecturer?.userName}
                      <span className="text-blue-500 text-sm bg-blue-50 px-2 py-1 rounded-full">
                        Super Tutor
                      </span>
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="badge badge-accent badge-sm">
                        ⭐ 4.9/5
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({tutor.review} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Duration */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        BDT {tutor.price}
                      </p>
                      <p className="text-gray-500 text-sm">50-min lesson</p>
                    </div>
                    <button className="btn btn-sm btn-accent rounded-full px-6">
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Tutor Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <FaGraduationCap className="w-6 h-6 text-purple-500" />
                    <span className="font-medium">{tutor.category} Lecturer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoLanguageSharp className="w-6 h-6 text-green-500" />
                    <span className="font-medium">
                      Speaks {tutor.category} (Native)
                    </span>
                  </div>
                </div>

                {/* Description with fade effect */}
                <div className="relative mb-4">
                  <div className="text-gray-600 text-sm line-clamp-3 bg-gradient-to-b from-transparent to-white bg-[length:100%_2em] bg-repeat-y">
                    {tutor.description || "Professional tutor with extensive experience..."}
                  </div>
                </div>

                {/* Contact Button */}
                <div className="border-t pt-4">
                  <Link
                    to={`/tutors/${tutor._id}`}
                    className="btn btn-block btn-outline btn-primary rounded-full gap-2"
                  >
                    <MdEmail className="text-lg" />
                    Contact Tutor
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredTutors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No tutors found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or explore other categories
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FindTutors;