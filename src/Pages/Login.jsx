import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const { userLogin, setUser, handleGoogleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const result = await userLogin(email, password);
            setUser(result.user);
            toast.success("Login Successful!");
            navigate(location?.state?.from || "/");
        } catch (error) {
            toast.warning("Incorrect information. Please try again.");
        }
    };

    const handleGoogle = async () => {
        try {
            await handleGoogleLogin();
            navigate(location?.state?.from || "/");
        } catch (error) {
            toast.error("Google login failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 border focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-white mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 border focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-xl text-gray-700"
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </button>
                    </div>
                    <div className="flex justify-between text-sm text-white">
                        <span></span>
                        <a href="#" className="hover:underline">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2 rounded-lg font-semibold"
                    >
                        Login
                    </button>
                </form>

                <div className="my-4 flex items-center justify-center text-white">
                    <div className="border-b border-white w-full"></div>
                    <span className="mx-2 text-sm">OR</span>
                    <div className="border-b border-white w-full"></div>
                </div>

                <button
                    onClick={handleGoogle}
                    className="w-full bg-white text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 py-2 rounded-lg font-medium"
                >
                    <FcGoogle className="text-2xl" /> Login with Google
                </button>

                <p className="text-white text-sm text-center mt-6">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="underline text-indigo-200 hover:text-white">
                        Register
                    </Link>
                </p>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default Login;
