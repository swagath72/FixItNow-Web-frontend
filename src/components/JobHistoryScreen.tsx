import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Calendar, DollarSign, CheckCircle, MessageCircle } from 'lucide-react';
import API from '../api';

export function JobHistoryScreen() {
  const navigate = useNavigate();

  const [completedJobs, setCompletedJobs] = useState<{
    id: number;
    customer: string;
    customer_email: string;
    service: string;
    date: string;
    amount: string;
    rating: number;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalEarned, setTotalEarned] = useState(0);
  const [rawCount, setRawCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Session expired. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await API.get('/bookings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const raw = res.data;
        if (!Array.isArray(raw)) {
          throw new Error("Server returned non-array data");
        }
        setRawCount(raw.length);

        const mapped = raw.map((b: any) => {
          let rawCost = b.cost || b.amount || b.total_amount || '0';
          let costStr = String(rawCost).replace(/[^\d.]/g, '');
          let costNum = parseFloat(costStr);
          if (isNaN(costNum)) costNum = 0;

          let originalStatus = b.status || '';
          let normalizedStatus = String(originalStatus).toLowerCase().trim();

          return {
            id: b.id,
            customer: b.customer_name || b.customer || 'Customer',
            customer_email: b.customer_email || '',
            service: b.service_name || b.service_type || b.service || 'Service',
            date: b.date || b.scheduled_date || 'N/A',
            amount: rawCost ? (String(rawCost).includes('₹') || String(rawCost).includes('$') ? String(rawCost) : `₹${rawCost}`) : '₹0',
            rating: b.rating_value || b.rating || 5,
            status: normalizedStatus,
            costNum,
          };
        });

        const completed = mapped.filter((b) =>
          ['completed', 'paid', 'confirmed', 'accepted', 'ongoing', 'started', 'on-the-way', 'on-the-way'].includes(b.status)
        );
        const earned = completed.reduce((sum, job) => sum + (job.costNum || 0), 0);

        setCompletedJobs(completed);
        setTotalEarned(earned);
      } catch (err: any) {
        const msg = err?.response?.data?.detail || err?.message || 'Unknown error';
        setError(`Failed to load history: ${msg} (${err?.response?.status || 'network error'})`);
        console.error('Failed to load history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="pb-12">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Job History</h1>
        <p className="text-gray-600">Your completed work</p>
      </div>


      {/* Stats */}
      <div className="px-6 mt-6 focus-within:">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-600 text-sm">Total Jobs</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedJobs.length}</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 shadow-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-white" />
              <span className="text-white/90 text-sm">Total Earned</span>
            </div>
            <p className="text-2xl font-bold text-white">₹{totalEarned}</p>
          </motion.div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="px-6 mt-6 pb-6 space-y-3">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center mb-4">
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : completedJobs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No completed jobs found. (Server returned {rawCount} total jobs)
          </div>
        ) : (
          completedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">{job.customer}</h3>
                <span className="text-lg font-bold text-green-600">{job.amount}</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{job.service}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{job.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span className="font-semibold text-gray-900">{job.rating}.0</span>
                </div>
              </div>
              {job.customer_email && (
                <button
                  onClick={() => navigate(`/technician/chat/${encodeURIComponent(job.customer_email)}`, {
                    state: { contact: { id: job.customer_email, name: job.customer, role: 'Customer' } }
                  })}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-50 text-[#136dec] py-2 rounded-xl font-medium hover:bg-blue-100 transition shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Customer</span>
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
