import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, User, Briefcase, FileText, CheckCircle, XCircle, Loader2, AlertCircle, Phone, Mail, Clock } from 'lucide-react';
import API, { BASE_URL } from '../api';
import { useAuth } from '../contexts/AuthContext';

interface TechDoc {
  id: number;
  doc_type: string;
  file_url: string;
  uploaded_at: string;
}

interface TechDetails {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
  verification_status: string;
  profile_pic_url: string | null;
}

export function AdminVerificationScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [technician, setTechnician] = useState<TechDetails | null>(null);
  const [documents, setDocuments] = useState<TechDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role?.toLowerCase() !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch technician details from the pending list directly
        const resTechs = await API.get('/admin/technicians/pending');
        const found = resTechs.data.find((t: any) => t.id === Number(id));
        if (found) {
          setTechnician(found);
        } else {
          setError('Technician not found or no longer pending.');
        }

        // Fetch documents
        const resDocs = await API.get(`/admin/technicians/${id}/documents`);
        setDocuments(resDocs.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load technician data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate]);

  const handleVerify = async (status: 'approved' | 'rejected') => {
    if (!window.confirm(`Are you sure you want to mark this technician as ${status}?`)) return;
    
    setActionLoading(true);
    try {
      await API.post(`/admin/technicians/${id}/verify`, { status });
      alert(`Technician successfully ${status}!`);
      navigate('/admin/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Verification action failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-[#136dec] animate-spin" />
      </div>
    );
  }

  if (error || !technician) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <span className="font-semibold">{error || 'Technician not found'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/admin/dashboard')} 
          className="flex items-center gap-2 text-gray-600 mb-8 hover:text-[#136dec] transition-all font-bold bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#136dec] to-purple-600" />
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gray-50 border-4 border-white shadow-lg mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  {technician.profile_pic_url ? (
                    <img
                      src={`${BASE_URL}${technician.profile_pic_url}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onClick={() => setSelectedImage(`${BASE_URL}${technician.profile_pic_url}`)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50">
                      <User className="w-12 h-12 text-[#136dec]" />
                    </div>
                  )}
                </div>
                <h2 className="text-3xl font-extrabold text-[#0f172a] mb-1">{technician.full_name}</h2>
                <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-orange-100 mb-6">
                  <Clock className="w-3.5 h-3.5" />
                  {technician.verification_status}
                </div>

                <div className="w-full space-y-4 text-left border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4 text-gray-600 group">
                    <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-[#136dec] group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="truncate font-medium">{technician.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 group">
                    <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-[#136dec] group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{technician.phone || 'No phone provided'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/20"
            >
              <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Briefcase className="w-6 h-6 text-[#136dec]" />
                </div>
                Professional Profile
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Service Expertise</p>
                  <p className="text-[#0f172a] font-bold text-lg bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                    {technician.skills}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Years of Experience</p>
                  <p className="text-[#0f172a] font-bold text-lg bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                    {technician.experience}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Documents */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-white/20 min-h-[600px] flex flex-col"
            >
              <h3 className="text-3xl font-extrabold text-[#0f172a] mb-8 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <FileText className="w-8 h-8 text-[#136dec]" />
                </div>
                Verification Documents
              </h3>

              {documents.length === 0 ? (
                <div className="bg-red-50 text-red-700 p-8 rounded-[2rem] border border-red-100 flex items-start gap-5 shadow-sm">
                  <div className="bg-white p-3 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <span className="font-extrabold text-2xl block mb-2">Missing Evidence</span>
                    <p className="text-lg font-medium opacity-80 text-red-600/80">This technician has not yet provided the required legal documentation for verification.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {documents.map((doc, idx) => {
                    const docUrl = `${BASE_URL}${doc.file_url}`;
                    return (
                      <motion.div 
                        key={doc.id} 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + (idx * 0.1) }}
                        className="group border-2 border-gray-50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white"
                      >
                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                          <span className="font-extrabold text-[#0f172a] uppercase tracking-wider text-sm">{doc.doc_type}</span>
                          <span className="text-[10px] bg-blue-100 text-[#136dec] font-black px-2 py-1 rounded-md">ID: {doc.id}</span>
                        </div>
                        <div 
                          className="aspect-[4/3] bg-gray-50 relative cursor-pointer overflow-hidden"
                          onClick={() => setSelectedImage(docUrl)}
                        >
                          {doc.file_url.endsWith('.pdf') ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-red-50 to-white">
                              <div className="bg-white p-5 rounded-3xl shadow-lg mb-4">
                                <FileText className="w-16 h-16 text-red-500" />
                              </div>
                              <span className="font-black text-red-600 tracking-tighter text-xl">VIEW PDF REPORT</span>
                            </div>
                          ) : (
                            <img 
                              src={docUrl} 
                              alt={doc.doc_type}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Missing'; }}
                            />
                          )}
                          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-[#136dec]/20 transition-all duration-500 flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                            <motion.span 
                              whileHover={{ scale: 1.1 }}
                              className="bg-white text-[#136dec] px-6 py-3 rounded-2xl font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 uppercase tracking-widest text-xs"
                            >
                              Expand View
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-100 flex flex-col sm:flex-row gap-6">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVerify('approved')}
                  disabled={actionLoading}
                  className="flex-1 bg-gradient-to-r from-[#136dec] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-5 rounded-3xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/40 disabled:opacity-50"
                >
                  <CheckCircle className="w-7 h-7" />
                  {actionLoading ? 'Verifying...' : 'Approve Profile'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVerify('rejected')}
                  disabled={actionLoading}
                  className="flex-1 bg-white hover:bg-red-50 text-red-600 border-2 border-red-500/30 py-5 rounded-3xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-red-200 disabled:opacity-50"
                >
                  <XCircle className="w-7 h-7" />
                  Reject Profile
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 p-4 md:p-8 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
              <button 
                className="absolute -top-12 right-0 text-white hover:text-red-400 bg-white/10 p-2 rounded-full transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <XCircle className="w-8 h-8" />
              </button>
              {selectedImage.endsWith('.pdf') ? (
                <iframe src={selectedImage} className="w-full h-[80vh] rounded-2xl bg-white" />
              ) : (
                <img 
                  src={selectedImage} 
                  alt="Enlarged Document" 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
