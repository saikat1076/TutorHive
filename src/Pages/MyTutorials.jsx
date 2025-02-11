import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const MyTutorials = () => {
    const { user } = useContext(AuthContext);
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            axios
                .get(`https://tutor-hive-sever.vercel.app/tutors/email/${user.email}`, {
                    withCredentials: true,
                })
                .then((res) => setTutorials(res.data));
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://tutor-hive-sever.vercel.app/tutors/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setTutorials((prev) =>
                                prev.filter((tutorial) => tutorial._id !== id)
                            );
                            Swal.fire("Deleted!", "Your tutorial has been deleted.", "success");
                        }
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                My Tutorials
            </h1>
            {tutorials.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                    <table className="table-auto w-full border-collapse">
                        <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Language</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Review</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorials.map((tutorial, index) => (
                                <tr
                                    key={tutorial._id}
                                    className={`hover:bg-gray-100 transition duration-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="border px-4 py-2 text-lg font-medium">
                                        {tutorial.lecturer.userName}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <img
                                            src={tutorial.Image}
                                            alt={tutorial.name}
                                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                                        />
                                    </td>
                                    <td className="border px-4 py-2 text-center">{tutorial.category}</td>
                                    <td className="border px-4 py-2 text-center">BDT {tutorial.price}</td>
                                    <td className="border px-4 py-2 text-center">{tutorial.description}</td>
                                    <td className="border px-4 py-2 text-center text-red-400 font-semibold">
                                        ({tutorial.review})
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <div className="flex justify-center gap-4">
                                            <Link
                                                to={`/update-tutorial/${tutorial._id}`}
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-semibold"
                                            >
                                                Update
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(tutorial._id)}
                                                className="text-red-600 hover:text-red-800 transition-colors duration-300 font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No tutorials found.</p>
            )}
        </div>
    );
};

export default MyTutorials;
