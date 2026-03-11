import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Zap, Shield } from 'lucide-react';
import API from '../api';

export function ForgotPasswordOTPScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'user@example.com';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // We only want to focus the first input, and setup the timer
    inputRefs.current[0]?.focus();
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Use another effect for navigation to avoid immediate redirect on initial render
  // if state hydration is slightly delayed (though it shouldn't be in React Router)
  // We commented this out so it doesn't bounce the user back aggressively if state is lost.
  /*
  useEffect(() => {
    if (!email || email === 'user@example.com') {
      console.warn("No email provided in state, redirecting back");
      navigate('/forgot-password');
    }
  }, [email, navigate]);
  */

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (!otp.every((digit) => digit !== '')) {
      setError('Please enter complete OTP');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await API.post('/verify-otp', { email, otp: otp.join('') });
      navigate('/reset-password', { state: { email, otp: otp.join('') } });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string } } };
      setError(axiosErr?.response?.data?.detail || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    try {
      await API.post('/forgot-password', { email });
    } catch {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Branding (Desktop) */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#136dec] to-purple-600 p-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 mb-8">
              <Shield className="w-32 h-32 text-white mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-white mb-4">
                Verify Your Email
              </h2>
              <p className="text-xl text-white/90">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-2xl text-white font-semibold mt-2">
                {email}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - OTP Form */}
        <div className="flex flex-col p-4 sm:p-6 lg:p-12">
          <button
            onClick={() => navigate('/forgot-password')}
            className="self-start mb-6 p-3 hover:bg-white rounded-xl transition flex items-center gap-2 text-gray-700 font-semibold"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full"
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

            <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10">
              <div className="text-center mb-10">
                <div className="bg-gradient-to-br from-[#136dec] to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3">
                  Enter OTP
                </h2>
                <p className="text-gray-600 text-lg">
                  We've sent a 6-digit code to
                </p>
                <p className="text-[#136dec] font-semibold text-lg mt-1">
                  {email}
                </p>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium text-center">
                  {error}
                </div>
              )}

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex gap-1.5 sm:gap-3 lg:gap-4 mb-8 justify-center"
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 lg:w-16 lg:h-20 text-center text-xl sm:text-2xl lg:text-3xl font-bold bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none transition-all"
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-8"
              >
                {timer > 0 ? (
                  <p className="text-gray-600 text-lg">
                    Resend code in{' '}
                    <span className="font-bold text-[#136dec]">{timer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-[#136dec] font-bold text-lg hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={handleVerify}
                disabled={!otp.every((digit) => digit !== '') || loading}
                whileHover={{ scale: !otp.every((digit) => digit !== '') ? 1 : 1.02 }}
                whileTap={{ scale: !otp.every((digit) => digit !== '') ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div >
    </div >
  );
}
