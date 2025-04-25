import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';


const Register = () => {
  const { CreateNewUser, setUser, updateUserProfile, handleGoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const minLength = 8;

    if (!upperCaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!lowerCaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!numberRegex.test(password)) {
      return "Password must contain at least one number";
    }
    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      setIsLoading(false);
      return;
    }

    CreateNewUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("🎉 Registration successful! Welcome aboard!");
            navigate('/');
          })
          .catch((error) => {
            toast.error(`⚠️ Error updating profile: ${error.message}`);
          });
      })
      .catch((error) => {
        toast.error(`❌ Registration failed: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleLoginClick = () => {
    setIsLoading(true);
    handleGoogleLogin()
      .then((res) => {
        const locationState = location.state?.from || '/';
        toast.success("🎉 Google login successful!");
        navigate(locationState);
      })
      .catch((error) => {
        toast.error(`❌ Google login failed: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <ToastContainer position="top-center" autoClose={3000} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
              <h1 className="text-3xl font-bold text-white">Join Career Compass</h1>
              <p className="text-blue-100 mt-2">Start your journey with us</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input 
                  name="name" 
                  type="text" 
                  placeholder="John Doe" 
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              
              {/* Photo URL Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Profile Photo URL</span>
                </label>
                <input 
                  name="photo" 
                  type="url" 
                  placeholder="https://example.com/photo.jpg" 
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              
              {/* Password Field */}
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input input-bordered w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Password must contain uppercase, lowercase, number, and be at least 8 characters
                </div>
              </div>
              
              {/* Register Button */}
              <div className="pt-2">
                <button 
                  className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
              
              {/* Divider */}
              <div className="divider text-gray-400">OR CONTINUE WITH</div>
              
              {/* Google Login */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLoginClick}
                type="button"
                className="btn btn-outline w-full gap-2"
                disabled={isLoading}
              >
                <FcGoogle size={20} />
                Sign up with Google
              </motion.button>
              
              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/auth/login" 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;