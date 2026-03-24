import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Clock, CheckCircle2, ArrowLeft, LogOut, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import API from '../api';

export function TechnicianVerificationPendingScreen() {
    const navigate = useNavigate();
    const { user, logout, updateUser } = useAuth();
    const [checking, setChecking] = useState(false);

    const checkStatus = async () => {
        setChecking(true);
        try {
            const res = await API.get('/user/technician-profile');
            const status = res.data.verification_status?.toLowerCase();
            if (status === 'approved' || status === 'verified') {
                updateUser({ verification_status: status });
                navigate('/technician/dashboard');
            }
        } catch (err) {
            console.error('Failed to check verification status:', err);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center"
            >
                <div className="mb-8 relative flex justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-blue-100 p-6 rounded-full"
                    >
                        <ShieldAlert className="w-16 h-16 text-[#136dec]" />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full border-4 border-white"
                    >
                        <Clock className="w-6 h-6 text-white" />
                    </motion.div>
                </div>

                <h1 className="text-3xl font-bold text-[#0f172a] mb-4">Verification Under Review</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Welcome, <span className="font-bold text-[#136dec]">{user?.name || 'Technician'}</span>! Your documents have been submitted successfully. Our team is currently reviewing your profile.
                </p>

                <div className="space-y-4 mb-10">
                    {[
                        'Professional Background Check',
                        'Skill Verification',
                        'Document Authenticity',
                    ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-gray-300" />
                            <span className="text-gray-500 font-medium text-sm">{step}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-left">
                    <p className="text-blue-800 text-sm font-medium mb-1">Estimated Time:</p>
                    <p className="text-blue-600 text-sm">Usually takes 24-48 hours. You will receive a notification once verified.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={checkStatus}
                        disabled={checking}
                        className="w-full bg-[#136dec] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg disabled:opacity-70"
                    >
                        {checking ? (
                            <RefreshCcw className="w-5 h-5 animate-spin" />
                        ) : (
                            <RefreshCcw className="w-5 h-5" />
                        )}
                        Check Verification Status
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center justify-center gap-2 text-gray-500 font-semibold hover:text-[#136dec] transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition shadow-sm"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
