import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Clock, User, Briefcase, FileText, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import API, { BASE_URL } from '../api';
import { useAuth } from '../contexts/AuthContext';

interface PendingTechnician {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
  verification_status: string;
  profile_pic_url: string | null;
}

export function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [technicians, setTechnicians] = useState<PendingTechnician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Basic check for admin role
    if (user?.role?.toLowerCase() !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchPending = async () => {
      try {
        const res = await API.get('/admin/technicians/pending');
        setTechnicians(res.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load pending technicians');
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, [user, navigate]);

  return (
    <div className="pb-10 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#136dec] to-purple-600 lg:rounded-b-[3rem] shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h1 className="text-white text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
                Admin Control Panel 👋
              </h1>
              <p className="text-white/90 text-xl font-medium">
                Manage and verify technician documents with ease.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:w-auto w-full flex items-center gap-5 border border-white/20 shadow-inner">
              <div className="bg-white/20 p-4 rounded-2xl border border-white/30">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white text-xl font-bold">{technicians.length} Pending</p>
                <p className="text-white/80 font-medium">Verification Tasks</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#0f172a] flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <Clock className="w-7 h-7 text-orange-600" />
            </div>
            Pending Approvals
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-12 h-12 text-[#136dec] animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 flex items-center gap-4 shadow-sm">
            <AlertCircle className="w-8 h-8" />
            <span className="text-lg font-semibold">{error}</span>
          </div>
        ) : technicians.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2.5rem] p-20 shadow-xl border border-gray-100 text-center"
          >
            <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-14 h-14 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">All Caught Up!</h3>
            <p className="text-gray-500 text-lg">No pending technician profiles require verification at this time.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicians.map((tech, idx) => (
              <motion.div
                key={tech.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => navigate(`/admin/technician/${tech.id}`)}
                className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl border border-gray-50 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <ChevronRight className="w-5 h-5 text-[#136dec]" />
                  </div>
                </div>

                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border-2 border-gray-100 shadow-sm group-hover:border-[#136dec]/30 transition-colors shrink-0">
                    {tech.profile_pic_url ? (
                      <img
                        src={`${BASE_URL}${tech.profile_pic_url}`}
                        alt={tech.full_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=User&background=random'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50">
                        <User className="w-10 h-10 text-[#136dec]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0f172a] group-hover:text-[#136dec] transition-colors leading-tight">
                      {tech.full_name}
                    </h3>
                    <p className="text-gray-500 font-medium mb-2">{tech.email}</p>
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-orange-100">
                      <Clock className="w-3.5 h-3.5" />
                      {tech.verification_status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172a] mb-0.5">{tech.skills}</p>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{tech.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Verify Documents</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between text-white font-bold bg-[#136dec] p-4 rounded-2xl shadow-lg shadow-blue-200 transform group-hover:scale-[1.02] transition-all">
                  <span>Review Profile</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
