import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, ArrowRight, Zap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import API from '../api';

export function RegisterScreen() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (field: string, value: string, currentFormData = formData) => {
        switch (field) {
            case 'name':
                if (!value) return 'Full Name is required';
                if (/\d/.test(value)) return 'Full name should not contain numbers';
                break;
            case 'email':
                if (!value) return 'Email Address is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
                break;
            case 'phone':
                if (!value) return 'Phone Number is required';
                if (value.trim().length !== 10) return 'Phone number must be exactly 10 digits';
                break;
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters';
                if (!/^[A-Z]/.test(value)) return 'Password must start with a capital letter';
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one special character';
                break;
            case 'confirmPassword':
                if (!value) return 'Confirm Password is required';
                if (value !== currentFormData.password) return 'Passwords do not match';
                break;
        }
        return '';
    };

    const handleChange = (field: string, value: string) => {
        let newValue = value;
        if (field === 'phone') {
            newValue = value.replace(/\D/g, '').slice(0, 10);
        }
        
        const newFormData = { ...formData, [field]: newValue };
        setFormData(newFormData);
        
        const fieldError = validateField(field, newValue, newFormData);
        setErrors((prev) => ({ ...prev, [field]: fieldError }));
    };

    const handleRegister = async () => {
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof typeof formData], formData);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            await API.post('/register', {
                full_name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim(),
                password: formData.password,
            });
            
            // Navigate to login after successful registration
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } catch (err: unknown) {
            const axiosErr = err as { response?: { data?: { detail?: unknown } } };
            const detail = axiosErr?.response?.data?.detail;
            if (Array.isArray(detail)) {
                setErrors({ general: detail.map((d: { msg?: string }) => d.msg || '').join(', ') || 'Registration failed.' });
            } else if (typeof detail === 'string') {
                setErrors({ general: detail });
            } else {
                setErrors({ general: 'Registration failed. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="grid lg:grid-cols-2 min-h-screen">
                {/* Left Side - Branding (Desktop Only) */}
                <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#136dec] to-purple-600 p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    </div>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="relative z-10 text-center"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            >
                                <Zap className="w-24 h-24 text-yellow-300" fill="currentColor" />
                            </motion.div>
                        </div>
                        <h1 className="text-6xl font-bold text-white mb-4">JOIN US</h1>
                        <p className="text-2xl text-white/90 mb-4">FIXIT NOW</p>
                        <p className="text-xl text-white/80 max-w-md">
                            Create your account and start booking trusted home services in minutes.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side - Register Form */}
                <div className="flex flex-col justify-center items-center p-6 lg:p-12">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md"
                    >
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-3 rounded-2xl shadow-lg">
                                    <Zap className="w-10 h-10 text-white" fill="white" />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent mb-2">
                                FIXIT NOW
                            </h1>
                        </div>

                        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-2">Create Account</h2>
                                <p className="text-gray-600">Join thousands of happy customers</p>
                            </div>

                            {errors.general && (
                                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                                    {errors.general}
                                </div>
                            )}

                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-2 transition-all focus:outline-none text-base ${
                                            errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#136dec]'
                                        }`}
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-2 transition-all focus:outline-none text-base ${
                                            errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#136dec]'
                                        }`}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-2 transition-all focus:outline-none text-base ${
                                            errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#136dec]'
                                        }`}
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        className={`w-full pl-12 pr-12 py-4 bg-gray-50 rounded-xl border-2 transition-all focus:outline-none text-base ${
                                            errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#136dec]'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="Re-enter your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                        className={`w-full pl-12 pr-12 py-4 bg-gray-50 rounded-xl border-2 transition-all focus:outline-none text-base ${
                                            errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#136dec]'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                            </div>

                            {/* Register Button */}
                            <motion.button
                                onClick={handleRegister}
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl transition-all mb-4"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </motion.button>

                            {/* Back to Login */}
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full flex items-center justify-center gap-2 text-[#136dec] font-semibold hover:underline transition"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Already have an account? Login
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
