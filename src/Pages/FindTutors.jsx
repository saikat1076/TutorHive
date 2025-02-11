import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdStar, MdEmail } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";


const FindTutors = () => {
    const { category } = useParams();
    const [tutors, setTutors] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredTutors, setFilteredTutors] = useState([]);

    // Fetch tutors data
    useEffect(() => {
        const url = category
            ? `https://tutor-hive-sever.vercel.app/tutors?category=${category}`
            : `https://tutor-hive-sever.vercel.app/tutors`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setTutors(data);
                setFilteredTutors(data);
            })
            .catch((err) => console.error("Error fetching tutors:", err));
    }, [category]);


    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);


        const filtered = tutors.filter((tutor) =>
            (tutor.category || "").toLowerCase().includes(value)
        );

        setFilteredTutors(filtered);
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4 mx-auto text-center">
                {/* {category ? "Tutor in" `${category}` : "All Tutors"} */}
                All Tutors
            </h1>

            {/* Search Input */}
            <div className="mb-4 flex justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by language..."
                        value={searchText}
                        onChange={handleSearchChange}
                        className="input input-bordered w-full pl-10"
                    />
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                        <FaSearch className="w-5 h-5" />
                    </span>
                </div>
            </div>

            {/* Tutors Grid */}
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map((tutor) => (
                        <div
                            key={tutor._id}
                            className="card max-w-sm bg-white shadow-lg rounded-lg p-4 mx-auto"
                        >
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <img
                                        src={tutor.lecturer?.photo}
                                        alt={tutor.lecturer?.userName}
                                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                                    />
                                    <div className="ml-4">
                                        <h2 className="card-title text-lg font-bold">
                                            {tutor.lecturer?.userName}
                                            <span className="bg-blue-600 rounded-full text-white">
                                                <MdOutlineVerified />
                                            </span>
                                        </h2>
                                        <div className="badge badge-secondary">Super Tutor</div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-gray-800">
                                        BDT {tutor.price}
                                    </p>
                                    <p className="font-bold text-gray-800">
                                        50-min lesson
                                    </p>
                                </div>
                            </div>
                            <p className="flex gap-3 p-2 text-xl place-items-center font-bold">
                                <FaGraduationCap />
                                {tutor.category} Lecturer
                            </p>
                            <p className="flex gap-3 text-lg place-items-center font-bold">
                                <span className="text-2xl pl-2">
                                    <IoLanguageSharp />
                                </span>
                                Speaks {tutor.category} (Proficiency)
                            </p>
                            <p className="text-gray-700 mt-4">
                                {tutor.description || "No description available."}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center text-yellow-500">
                                    {[...Array(5)].map((_, index) => (
                                        <MdStar key={index} />
                                    ))}
                                    <span className="text-red-500 text-sm ml-2">
                                        ({tutor.review} reviews)
                                    </span>
                                </div>
                            </div>
                            <Link
                                to={`/tutors/${tutor._id}`}
                                className="btn btn-primary mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                See Details
                            </Link>
                            <div className="flex items-center mt-4 text-gray-600">
                                <MdEmail className="mr-2" />
                                <p className="text-sm">{tutor.email}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tutors found.</p>
                )}
            </div>
        </div>
    );
};

export default FindTutors;
