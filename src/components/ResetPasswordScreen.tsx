import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Lock, ArrowRight, ArrowLeft, Zap, Eye, EyeOff, CheckCircle2, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import API from '../api';

export function ResetPasswordScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'user@example.com';
  const otp = location.state?.otp || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await API.post('/reset-password', {
        email,
        otp,
        new_password: newPassword,
        confirm_password: confirmPassword
      });
      navigate('/login', { state: { message: 'Password reset successfully! Please login.' } });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string | any[] } } };
      const detail = axiosErr?.response?.data?.detail;

      let errorMsg = 'Failed to reset password. Please try again.';
      if (typeof detail === 'string') {
        errorMsg = detail;
      } else if (Array.isArray(detail) && detail.length > 0 && detail[0].msg) {
        errorMsg = detail[0].msg;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Removed aggressive redirect to avoid bouncing users
  /*
  if (!email) {
    navigate('/forgot-password');
    return null;
  }
  */

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
              <CheckCircle2 className="w-32 h-32 text-white mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-white mb-4">
                Create New Password
              </h2>
              <p className="text-xl text-white/90">
                Your new password must be different from previously used passwords
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
              <h3 className="text-white font-bold text-lg mb-4">Password Requirements:</h3>
              <div className="text-left space-y-2">
                <p className="text-white/90 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> At least 6 characters
                </p>
                <p className="text-white/90 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Contains letters and numbers
                </p>
                <p className="text-white/90 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Easy to remember, hard to guess
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Reset Password Form */}
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
                  Reset Password
                </h2>
                <p className="text-gray-600 text-lg">
                  Create a strong new password
                </p>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              {/* New Password Input */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-5"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none text-lg transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none text-lg transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Password Requirements - Mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="lg:hidden bg-blue-50 rounded-xl p-4 mb-6"
              >
                <p className="text-sm font-semibold text-gray-700 mb-2">Password must have:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#136dec]" /> At least 6 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#136dec]" /> Letters and numbers
                  </li>
                </ul>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={handleResetPassword}
                disabled={!newPassword || !confirmPassword || loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Submit
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
