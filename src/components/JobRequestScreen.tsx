import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign, User, Phone, X, Check, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import API from '../api';

interface JobDetails {
  id: number;
  customer_name: string;
  customer_email: string;
  service_name: string;
  description: string;
  address: string;
  date: string;
  time: string;
  cost: string;
  status: string;
  customer_phone?: string;
  distance?: string;
}

export function JobRequestScreen() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!job || isProcessing) return;

    try {
      setIsProcessing(true);
      const currentToken = localStorage.getItem('token');
      await API.post('/technician/update-job-status', {
        booking_id: job.id,
        status: newStatus
      }, {
        headers: {
          Authorization: currentToken ? `Bearer ${currentToken}` : undefined
        }
      });

      if (newStatus === 'Ongoing' || newStatus === 'Accepted') {
        navigate(`/technician/job-navigation/${job.id}`);
      } else {
        navigate('/technician/dashboard');
      }
    } catch (err) {
      console.error('Error updating job status:', err);
      alert('Failed to update job status. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#136dec] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-sm w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Job not found'}</p>
          <button
            onClick={() => navigate('/technician/dashboard')}
            className="w-full py-3 bg-[#136dec] text-white rounded-xl font-bold shadow-lg shadow-blue-500/30"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Job Request</h1>
        <p className="text-gray-600">Ref: #{job.id}</p>
      </div>


      {/* Job Details */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 mt-8 pb-32"
      >
        {/* Customer Info */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#136dec] to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#0f172a] text-xl">{job.customer_name || 'Customer'}</h3>
              <p className="text-[#64748b] text-sm font-medium">Customer</p>
            </div>
            <div className="flex gap-2">
              {job.customer_phone && (
                <a
                  href={`tel:${job.customer_phone}`}
                  className="bg-blue-50 p-4 rounded-2xl hover:bg-blue-100 transition shadow-sm"
                >
                  <Phone className="w-6 h-6 text-[#136dec]" />
                </a>
              )}
              <button
                onClick={() => navigate(`/technician/chat/${encodeURIComponent(job.customer_email)}`, {
                  state: { contact: { id: job.customer_email, name: job.customer_name, role: 'Customer' } }
                })}
                className="bg-blue-50 p-4 rounded-2xl hover:bg-blue-100 transition shadow-sm"
              >
                <MessageCircle className="w-6 h-6 text-[#136dec]" />
              </button>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-6">
          <h3 className="font-bold text-[#0f172a] text-lg mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#136dec] rounded-full"></span>
            Service Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Service Type</p>
              <p className="font-bold text-[#0f172a] text-lg">{job.service_name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</p>
              <p className="text-gray-600 leading-relaxed">{job.description || 'No additional details provided.'}</p>
            </div>
          </div>
        </div>

        {/* Location & Time */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-6">
          <h3 className="font-bold text-[#0f172a] text-lg mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Location & Time
          </h3>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#136dec]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                <p className="font-bold text-[#0f172a]">{job.address}</p>
                {job.distance && <p className="text-sm font-bold text-[#136dec] mt-1">{job.distance} away</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-50 p-3 rounded-xl flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Scheduled Date & Time</p>
                <p className="font-bold text-[#0f172a]">{job.date} at {job.time}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Payment */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[24px] p-6 shadow-xl shadow-green-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-bold uppercase tracking-wider">Estimated Earnings</p>
                <p className="text-white text-3xl font-black">{job.cost}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/80 backdrop-blur-lg p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] border-t border-gray-100 z-50">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button
            onClick={() => handleUpdateStatus('Rejected')}
            disabled={isProcessing}
            className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-100 transition disabled:opacity-50"
          >
            <X className="w-5 h-5" />
            Reject
          </button>
          <button
            onClick={() => handleUpdateStatus('Ongoing')}
            disabled={isProcessing}
            className="flex-2 bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-4 px-10 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Check className="w-6 h-6" />
                Accept Job
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
