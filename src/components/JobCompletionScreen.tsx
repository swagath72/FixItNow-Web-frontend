import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Upload, CheckCircle, DollarSign, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import API from '../api';

interface JobDetails {
  id: number;
  customer_name: string;
  customer_email: string;
  service_name: string;
  cost: string;
}

export function JobCompletionScreen() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [completed, setCompleted] = useState(false);
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
        const data = res.data;
        setJob({
          id: data.id,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          service_name: data.service_name,
          cost: data.cost
        });
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const handleUploadPhoto = () => {
    setPhotoUploaded(true);
  };

  const handleCompleteJob = async () => {
    if (!job || isProcessing) return;

    try {
      setIsProcessing(true);
      const currentToken = localStorage.getItem('token');
      await API.post('/technician/update-job-status', {
        booking_id: job.id,
        status: 'Completed'
      }, {
        headers: {
          Authorization: currentToken ? `Bearer ${currentToken}` : undefined
        }
      });

      setCompleted(true);
      setTimeout(() => {
        navigate('/technician/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Error completing job:', err);
      alert('Failed to complete job. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
          <p className="text-gray-600 mb-6">{error || 'Job not found'}</p>
          <button onClick={() => navigate(-1)} className="w-full py-3 bg-[#136dec] text-white rounded-xl font-bold">Back</button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-green-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-200">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-[#0f172a] mb-3">Job Perfected!</h2>
          <p className="text-[#64748b] font-medium mb-8">Excellent work! Payment is being processed.</p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <p className="text-[#94a3b8] font-bold uppercase tracking-widest text-xs mb-2">Total Earnings</p>
            <p className="text-5xl font-black text-green-600 mb-4">{job.cost}</p>
            <div className="h-1.5 w-12 bg-green-100 rounded-full mx-auto"></div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#136dec] to-purple-600 p-8 rounded-b-[40px] shadow-xl relative">
        <div className="flex justify-between items-start mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => navigate(`/technician/chat/${encodeURIComponent(job.customer_email)}`, {
              state: { contact: { id: job.customer_email, name: job.customer_name, role: 'Customer' } }
            })}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all flex items-center gap-2 text-white font-bold"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="hidden sm:inline">Chat with Customer</span>
          </button>
        </div>
        <h1 className="text-white text-3xl font-black mb-2 tracking-tight">Finalize Job</h1>
        <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-xs">
          <span className="bg-white/20 px-2 py-1 rounded-lg">#ID-{job.id}</span>
          <span>•</span>
          <span>{job.customer_name}</span>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 mt-8 pb-32 max-w-2xl mx-auto"
      >
        {/* Upload Work Photo */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-6 border border-gray-50">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <Camera className="w-7 h-7 text-[#136dec]" />
            </div>
            <div>
              <h3 className="font-black text-[#0f172a] text-xl">Work Proof</h3>
              <p className="text-[#64748b] text-sm font-medium">Clear photo of completed result</p>
            </div>
          </div>

          {photoUploaded ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 border-2 border-green-100 rounded-3xl p-6 flex flex-col items-center gap-3 text-center"
            >
              <div className="bg-white p-3 rounded-full shadow-sm">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="font-black text-green-900">Photo Recorded</p>
                <p className="text-sm font-bold text-green-700/70 uppercase tracking-wider">Tap below to submit</p>
              </div>
              <button
                onClick={() => setPhotoUploaded(false)}
                className="text-xs font-black text-green-600 underline mt-2"
              >
                Change Photo
              </button>
            </motion.div>
          ) : (
            <button
              onClick={handleUploadPhoto}
              className="w-full border-4 border-dashed border-gray-100 rounded-[32px] p-12 hover:border-[#136dec]/30 hover:bg-blue-50/50 transition-all group"
            >
              <div className="bg-gray-50 p-5 rounded-full w-fit mx-auto mb-4 group-hover:bg-white group-hover:shadow-lg transition-all">
                <Upload className="w-10 h-10 text-gray-300 group-hover:text-[#136dec]" />
              </div>
              <p className="text-[#0f172a] font-black text-lg">Upload Result</p>
              <p className="text-[#94a3b8] text-sm font-bold mt-1 uppercase tracking-widest">JPEG, PNG up to 10MB</p>
            </button>
          )}
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 mb-6 group relative overflow-hidden">
          <div className="flex items-center gap-5 mb-6 relative z-10">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Contract Amount</p>
              <p className="text-[#0f172a] text-4xl font-black tracking-tight">{job.cost}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 relative z-10">
            <p className="text-gray-600 text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Secure direct deposit to your FixIt Wallet
            </p>
          </div>
        </div>


        {/* Requirements */}
        <div className="mt-8 px-6">
          <h4 className="font-black text-[#0f172a] text-sm uppercase tracking-[0.2em] mb-4">Checklist</h4>
          <div className="space-y-4">
            {[
              "Verify work quality with customer",
              "Maintain professional conduct",
              "Clean up workspace thoroughly"
            ].map((item, i) => (
              <div key={i} className="flex font-bold items-center gap-3 text-sm text-[#64748b]">
                <div className="w-5 h-5 rounded-md bg-white border-2 border-gray-100 flex items-center justify-center text-[10px] text-[#136dec]">
                  ✓
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Complete Button */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/80 backdrop-blur-xl p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleCompleteJob}
            disabled={!photoUploaded || isProcessing}
            className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-5 rounded-[24px] font-black text-xl shadow-2xl shadow-blue-500/25 disabled:opacity-30 disabled:grayscale hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              <>
                Confirm & Payout
                <CheckCircle className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
