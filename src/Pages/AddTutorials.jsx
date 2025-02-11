import React, { useContext, useState } from 'react';
import { FaStar, FaGripLines } from 'react-icons/fa';
import { MdDeliveryDining, MdEmail, MdPerson } from 'react-icons/md';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2'


const AddTutorials = () => {
    const { user } = useContext(AuthContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const Image = form.Image.value;
        const name = form.name.value;
        const category = form.Language.value;
        const description = form.description.value;
        const price = form.price.value;
        const review = form.review.value;
        const email = form.email.value;
        const userName = form.userName.value;

        const AddTutorials = {
            Image,
            name,
            category,
            description,
            price,
            review,
            email,
            lecturer: {
                userName,
                photo: user?.photoURL,
            },
         
        };
        console.log(AddTutorials);




        fetch('https://tutor-hive-sever.vercel.app/tutors', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(AddTutorials)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }

            })

    };

    return (
        <div className="mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Add Tutorials</h1>
            <form onSubmit={handleSubmit} className="space-y-6">


                <div className="flex justify-between gap-x-3">
                    {/* Read-only User Email */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">User Email</label>
                        <div className="flex items-center gap-2">
                            <MdEmail className="text-blue-500" />
                            <input
                                type="text"
                                name='email'
                                value={user?.email || "Name@gmail.com"}
                                readOnly
                                className="input input-disabled w-full"
                            />
                        </div>
                    </div>

                    {/* Read-only User Name */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">User Name</label>
                        <div className="flex items-center gap-2">
                            <MdPerson className="text-purple-500" />
                            <input
                                type="text"
                                name='userName'
                                value={user?.displayName || "Name"}
                                readOnly
                                className="input input-disabled w-full"
                            />
                        </div>
                    </div>
                </div>


                

                <div className="flex justify-between gap-x-3">
                    {/* Image */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="text"
                            name="Image"
                            placeholder="Image URL"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Category Name */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">Language</label>
                        <input
                            type="text"
                            name="Language"
                            placeholder="Enter language"
                            className="input input-bordered w-full"
                        />
                    </div>


                </div>

                {/* Description */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter equipment description"
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                <div className="flex justify-between gap-x-3">
                    {/* Price */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* review */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">Review</label>
                        <div className="flex items-center gap-2">
                            <FaGripLines className="text-gray-600" />
                            <input
                                type="text"
                                name="review"
                                placeholder="Input Review"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>


                {/* Submit Button */}
                <div className="text-center">
                    <button className="btn btn-primary w-full">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddTutorials;