import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, ArrowRight, ArrowLeft, Zap, KeyRound, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import API from '../api';

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address');
      return;
    }
    if (!trimmedEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await API.post('/forgot-password', { email: trimmedEmail });
      navigate('/forgot-password-otp', { state: { email: trimmedEmail } });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string } } };
      setError(axiosErr?.response?.data?.detail || 'Failed to send OTP. Please try again.');
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
            transition={{ duration: 0.5, type: "spring" }}
            className="relative z-10 text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 mb-8">
              <KeyRound className="w-32 h-32 text-white mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-white mb-4">
                Reset Password
              </h2>
              <p className="text-xl text-white/90">
                Don't worry! It happens. Enter your email and we'll send you a code to reset your password.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Shield className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-semibold">Secure</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Mail className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-semibold">Quick</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <KeyRound className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-semibold">Easy</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="flex flex-col p-6 lg:p-12">
          <button
            onClick={() => navigate('/login')}
            className="self-start mb-6 p-3 hover:bg-white rounded-xl transition flex items-center gap-2 text-gray-700 font-semibold"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="hidden sm:inline">Back to Login</span>
          </button>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
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
              <p className="text-gray-600">Plumbing & Electrical Services</p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-[#136dec] to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <KeyRound className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3">
                  Forgot Password?
                </h2>
                <p className="text-gray-600 text-lg">
                  Enter your email to receive a verification code
                </p>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none text-lg transition-all"
                  />
                </div>
              </motion.div>

              {/* Send OTP Button */}
              <motion.button
                type="button"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onClick={handleSendOTP}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-60 hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-gray-500">
                  Remember your password?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-[#136dec] hover:underline font-semibold"
                  >
                    Back to Login
                  </button>
                </p>
              </motion.div>
            </div>

            {/* Info Cards - Mobile */}
            <div className="lg:hidden grid grid-cols-3 gap-3 mt-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 shadow-lg text-center"
              >
                <Shield className="w-6 h-6 text-[#136dec] mx-auto mb-2" />
                <p className="text-xs text-gray-700 font-semibold">Secure</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl p-4 shadow-lg text-center"
              >
                <Mail className="w-6 h-6 text-[#136dec] mx-auto mb-2" />
                <p className="text-xs text-gray-700 font-semibold">Quick</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-xl p-4 shadow-lg text-center"
              >
                <KeyRound className="w-6 h-6 text-[#136dec] mx-auto mb-2" />
                <p className="text-xs text-gray-700 font-semibold">Easy</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
