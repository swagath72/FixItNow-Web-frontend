import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Navigation, Phone, MessageCircle, MapPin, Loader2, AlertCircle } from 'lucide-react';
import API from '../api';

interface JobDetails {
  id: number;
  customer_name: string;
  customer_email: string;
  address: string;
  customer_phone?: string;
  eta?: string;
}

export function JobNavigationScreen() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const currentToken = localStorage.getItem('token');
        const res = await API.get(`/booking/${jobId}`, {
          headers: {
            Authorization: currentToken ? `Bearer ${currentToken}` : undefined
          }
        });

        const data = res.data;
        setJob({
          id: data.id,
          customer_name: data.customer_name,
          customer_email: data.customer_email || '',
          address: data.address,
          customer_phone: data.customer_phone || data.customer_email,
          eta: '12 mins'
        });
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load navigation details.');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const handleStartJob = () => {
    navigate(`/technician/job-completion/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-[#136dec] animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-sm w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-6">{error || 'Job details not found'}</p>
          <button onClick={() => navigate(-1)} className="w-full py-3 bg-[#136dec] text-white rounded-xl font-bold">Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative">
      {/* Map Placeholder */}
      <div className="h-[65vh] bg-gradient-to-br from-blue-200 to-purple-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Navigation className="w-20 h-20 text-[#136dec] mx-auto mb-4 drop-shadow-lg" />
            </motion.div>
            <p className="text-[#0f172a] font-bold text-xl uppercase tracking-widest opacity-50">Live Navigation</p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white p-4 rounded-[20px] shadow-xl hover:shadow-2xl transition-all active:scale-95 z-10"
        >
          <ArrowLeft className="w-6 h-6 text-[#136dec]" />
        </button>

        {/* ETA Badge */}
        <div className="absolute top-6 right-6 bg-white px-5 py-4 rounded-[20px] shadow-xl z-10 border border-blue-50">
          <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-1">Estimated Arrival</p>
          <p className="text-2xl font-black text-[#136dec]">{job.eta}</p>
        </div>
      </div>

      {/* Job Info Card */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
        className="absolute bottom-0 left-0 lg:left-0 right-0 bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] p-8 z-20"
      >
        <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>

        <div className="mb-8">
          <h3 className="font-black text-[#0f172a] text-2xl mb-2">{job.customer_name}</h3>
          <div className="flex items-start gap-3 text-[#64748b]">
            <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#136dec]" />
            </div>
            <p className="text-sm font-semibold leading-relaxed">{job.address}</p>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex gap-4 mb-8">
          <a
            href={`tel:${job.customer_phone}`}
            className="flex-1 bg-blue-50 text-[#136dec] py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-100 transition shadow-sm active:scale-95"
          >
            <Phone className="w-6 h-6" />
            Call
          </a>
          <button
            onClick={() => navigate(`/technician/chat/${encodeURIComponent(job.customer_email)}`, { state: { contact: { id: job.customer_email, name: job.customer_name, role: 'Customer' } } })}
            className="flex-1 bg-gray-50 text-[#0f172a] py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-sm active:scale-95"
          >
            <MessageCircle className="w-6 h-6" />
            Message
          </button>
        </div>

        {/* Start Job Button */}
        <button
          onClick={handleStartJob}
          className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-5 rounded-[24px] font-black text-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Start Job
        </button>

        <p className="text-center text-sm font-bold text-[#94a3b8] mt-4 uppercase tracking-widest">
          Tap when you arrive at the location
        </p>
      </motion.div>
    </div>
  );
}
