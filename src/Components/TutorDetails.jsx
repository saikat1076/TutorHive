import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaYoutube, FaStar } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { motion } from "framer-motion";

function TutorDetails() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [tutor, setTutor] = useState(null);

    useEffect(() => {
        fetch(`https://tutor-hive-sever.vercel.app/tutors/${id}`)
            .then((response) => response.json())
            .then((data) => setTutor(data))
            .catch((error) => console.error("Error fetching tutor data:", error));
    }, [id]);

    const handleBook = async () => {
        const bookedTutor = {
            tutorId: tutor._id,
            image: tutor.Image,
            language: tutor.category,
            price: tutor.price,
            name: tutor.lecturer.userName,
            tutorEmail: tutor.email,
            email: user.email,
            review: tutor.review,
        };

        try {
            const response = await fetch("https://tutor-hive-sever.vercel.app/book-tutors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookedTutor),
            });

            const data = await response.json();
            if (data.insertedId) {
                Swal.fire("Success", "Tutor booked successfully!", "success");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to book tutor.", "error");
        }
    };

    if (!tutor) return <Loading />;

    return (
        <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-indigo-100 to-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative">
                        <img
                            src={tutor.Image}
                            alt={tutor.lecturer.userName}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                            <FaYoutube className="text-red-600 text-4xl cursor-pointer hover:scale-110 transition" />
                        </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={tutor.lecturer.photo}
                                    alt={tutor.lecturer.userName}
                                    className="w-14 h-14 rounded-full border-2 border-indigo-500"
                                />
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {tutor.lecturer.userName}
                                </h2>
                            </div>
                            <p className="text-gray-600 text-base mb-4">
                                {tutor.description}
                            </p>
                            <div className="flex justify-between text-lg font-semibold text-gray-700 mb-3">
                                <p><span className="text-indigo-600">Language:</span> {tutor.category}</p>
                                <p><span className="text-indigo-600">Price:</span> BDT {tutor.price}</p>
                            </div>
                            <div className="flex items-center text-yellow-500 text-lg mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                                <span className="ml-2 text-sm text-gray-500">
                                    ({tutor.review} reviews)
                                </span>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBook}
                            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Book This Tutor
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default TutorDetails;
