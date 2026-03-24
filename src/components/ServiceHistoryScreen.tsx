import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, DollarSign, Star, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import API from '../api';

interface Booking {
  id: number;
  service: string;
  technician: string;
  technician_email: string;
  date: string;
  amount: string;
  rating?: number;
  reason?: string;
  status: string;
  payment_status: string;
}

export function ServiceHistoryScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'completed' | 'cancelled'>('completed');
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const currentToken = localStorage.getItem('token');
        const res = await API.get('/bookings', {
          headers: {
            Authorization: currentToken ? `Bearer ${currentToken}` : undefined
          }
        });
        const raw = res.data as any[];
        const mapped: Booking[] = raw.map((b) => ({
          id: b.id,
          service: b.service_name || b.service_type || b.service || 'Service',
          technician: b.technician_name || b.technician || 'TBD',
          technician_email: b.technician_email || '',
          date: b.scheduled_date
            ? new Date(b.scheduled_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            : b.date || '',
          amount:
            b.cost != null
              ? String(b.cost).includes('₹') ? String(b.cost) : `₹${b.cost}`
              : b.amount != null
                ? `₹${b.amount}`
                : b.total_amount != null
                  ? `₹${b.total_amount}`
                  : 'N/A',
          rating: b.rating_value != null ? b.rating_value : b.rating,
          reason: b.cancellation_reason,
          status: b.status ? b.status.toLowerCase() : 'unknown',
          payment_status: b.payment_status ? b.payment_status.toLowerCase() : '',
        }));
        setAllBookings(mapped);
      } catch (err: any) {
        console.error('ServiceHistory failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const bookings = allBookings.filter((b: Booking) => {
    const status = b.status?.toLowerCase() || '';
    const pStatus = b.payment_status?.toLowerCase() || '';
    
    // Booking is "completed" for the history if it's finished by tech OR paid
    const isCompleted = status === 'completed' || status === 'finished' || status === 'paid' || pStatus === 'paid';
    const isCancelled = status === 'cancelled' || status === 'rejected';

    if (activeTab === 'completed') return isCompleted;
    if (activeTab === 'cancelled') return isCancelled;
    return false;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 lg:rounded-2xl lg:m-6 lg:shadow-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/customer/home')}
            className="text-white hover:bg-white/20 p-2 rounded-xl transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Service History</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/20 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${activeTab === 'completed'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-white'
              }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${activeTab === 'cancelled'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-white'
              }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-6 mt-6 pb-6 space-y-4">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-md text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              No {activeTab} bookings found.
            </p>
          </div>
        ) : (
          bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{booking.service}</h3>
                <div className="flex items-center gap-2">
                  {activeTab === 'completed' && booking.rating != null && (
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-yellow-700">
                        {booking.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {activeTab === 'completed' && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{booking.technician}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{booking.date}</span>
                </div>
                {activeTab === 'completed' && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-semibold">{booking.amount}</span>
                  </div>
                )}
                {activeTab === 'cancelled' && booking.reason && (
                  <p className="text-sm text-red-600 italic">{booking.reason}</p>
                )}
              </div>

              {activeTab === 'completed' && (
                <div className="flex gap-3 mt-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition">
                    Book Again
                  </button>
                  {booking.technician_email && (
                    <button
                      onClick={() => navigate(`/customer/chat/${encodeURIComponent(booking.technician_email)}`, {
                        state: { contact: { id: booking.technician_email, name: booking.technician, role: 'Technician' } }
                      })}
                      className="bg-blue-50 text-blue-600 px-4 rounded-xl hover:bg-blue-100 transition shadow-sm border border-blue-100"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
