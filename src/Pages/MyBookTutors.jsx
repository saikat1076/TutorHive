import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Components/Loading";
import axios from "axios";
import Swal from "sweetalert2";

function MyBookedTutors() {
    const { user } = useContext(AuthContext);
    const [bookedTutors, setBookedTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookedTutors = async () => {
            if (!user?.email) {
                setLoading(false); // Stop loading if user is undefined
                return;
            }

            try {
                const response = await axios.get(
                    `https://tutor-hive-sever.vercel.app/book-tutors?email=${user.email}`,
                    { withCredentials: true }
                );
                setBookedTutors(response.data);
            } catch (error) {
                console.error("Error fetching booked tutors:", error);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchBookedTutors();
    }, [user.email]);

    const handleAddReview = async (tutorId, currentReviewCount) => {
        // Increase review count by 1 if it's 0
        const newReviewCount = currentReviewCount === 0 ? 1 : currentReviewCount;

        // Show SweetAlert2 modal for review (input box)
        const { value: review } = await Swal.fire({
            title: 'Add Your Review',
            input: 'textarea',
            inputPlaceholder: 'Write your review here...',
            inputAttributes: {
                'aria-label': 'Write your review'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit Review',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            }
        });

        if (review) {
            // If a review was entered, show success message
            Swal.fire('Success', 'Your review has been added!', 'success');
            
            // Increment the review count (from 0 to 1)
            setBookedTutors((prevTutors) =>
                prevTutors.map((tutor) =>
                    tutor._id === tutorId
                        ? { ...tutor, review: newReviewCount } // Update review count on card
                        : tutor
                )
            );
        } else {
            // If the user cancels, no changes are made
            Swal.fire('Cancelled', 'Your review was not submitted.', 'info');
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-10">
                <Loading />
            </div>
        );
    }

    if (!bookedTutors.length) {
        return (
            <p className="text-center mt-10 text-lg text-gray-700">
                No booked tutors found.
            </p>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-white mb-8">
                My Booked Tutors
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bookedTutors.map((tutor) => (
                    <div
                        key={tutor._id}
                        className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={tutor.image}
                                alt={tutor.name}
                                className="w-full h-48 object-cover rounded-t-lg transition-all duration-300 hover:scale-110"
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 mb-2">
                                {tutor.name}
                            </h2>
                            <p className="badge badge-secondary mt-2">{tutor.language} Tutor</p>
                            <p className="text-gray-600 text-xl font-bold mt-2">
                                Price:{" "}
                                <span className="text-gray-800 font-medium">
                                    BDT {tutor.price}
                                </span>
                            </p>
                            <p className="text-gray-600 text-lg font-mono mt-2">
                                Tutor Email:{" "}
                                <span className="text-gray-800">{tutor.tutorEmail}</span>
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-yellow-500 text-xl font-semibold">
                                    Reviews:{" "}
                                    <span className="text-gray-800 font-bold">
                                        {tutor.review}
                                    </span>
                                </span>
                                <button
                                    onClick={() => handleAddReview(tutor._id, tutor.review)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                                >
                                    Add Review
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-bl-md">
                            Booked
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBookedTutors;
