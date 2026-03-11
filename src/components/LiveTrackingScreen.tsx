import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Phone, MessageCircle, MapPin, CreditCard, ChevronLeft, Loader2 } from 'lucide-react';

import { useBooking } from '../contexts/BookingContext';
import API from '../api';

export function LiveTrackingScreen() {
  const navigate = useNavigate();
  const { ongoingBooking, updateBookingStatus, completeBooking } = useBooking();
  const [currentStatus, setCurrentStatus] = useState(ongoingBooking?.status || 'on-the-way');
  const [isProcessing, setIsProcessing] = useState(false);
  const [billAmount, setBillAmount] = useState(500); // Default or from API
  const [technicianData, setTechnicianData] = useState({
    name: ongoingBooking?.technicianName || 'Technician',
    image: '',
    rating: 4.9,
    role: 'Expert Technician',
    eta: ongoingBooking?.estimatedTime || '15 mins'
  });

  const fetchLatestStatus = useCallback(async () => {
    if (!ongoingBooking?.id) return;
    try {
      const response = await API.get(`/booking/${ongoingBooking.id}`);
      const data = response.data;

      // Update technician info if available
      if (data.technician_name) {
        setTechnicianData(prev => ({
          ...prev,
          name: data.technician_name,
          image: data.technician_profile_pic || '',
          role: data.service_name || prev.role
        }));
      }

      // Update bill amount if available
      if (data.cost || data.amount) {
        const costStr = (data.cost || String(data.amount || '500'));
        const val = parseInt(costStr.replace('₹', '').replace(',', '')) || 500;
        setBillAmount(val);
      }

      const backendStatus = data.status; // 'Pending' | 'Confirmed' | 'Technician Assigned' | 'Completed' | 'paid'

      if (['Completed', 'Pending Payment'].includes(backendStatus)) {
        setCurrentStatus('completed');
        updateBookingStatus('completed');
      } else if (backendStatus === 'paid') {
        updateBookingStatus('completed');
        completeBooking(); // Fully close the booking
        navigate('/customer/home');
      }
    } catch (err) {
      console.error('Polling error:', err);
    }
  }, [ongoingBooking?.id, updateBookingStatus, completeBooking, navigate]);

  useEffect(() => {
    if (!ongoingBooking) {
      navigate('/customer/home');
    }
  }, [ongoingBooking, navigate]);

  useEffect(() => {
    // Initial fetch
    fetchLatestStatus();

    // Status polling
    const pollInterval = setInterval(fetchLatestStatus, 5000);
    return () => clearInterval(pollInterval);
  }, [fetchLatestStatus]);

  const handleRazorpayPayment = () => {
    if (!ongoingBooking) return;

    setIsProcessing(true);

    const options = {
      key: "rzp_test_SN5q4r9UbjjvQv",
      amount: billAmount * 100, // Amount in paise
      currency: "INR",
      name: "FIXIT NOW",
      description: `Payment for ${ongoingBooking.serviceName}`,
      image: "/src/assets/logo.png",
      handler: async function (response: any) {
        console.log("Razorpay Success:", response);
        try {
          // Update status in backend (using numeric ID)
          await API.post('/technician/update-job-status', {
            booking_id: parseInt(ongoingBooking.id),
            status: 'paid'
          });
        } catch (err) {
          console.error('Finalizing payment error:', err);
          // We still proceed since the money was taken, but alert the user if needed
          // alert('Payment successful. System sync in progress...'); 
        } finally {
          updateBookingStatus('completed');
          completeBooking(); // Fully close the booking locally
          navigate('/customer/home');
          setIsProcessing(false);
        }
      },
      prefill: {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
      },
      theme: {
        color: "#136dec",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const isCompleted = currentStatus === 'completed';

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50 flex flex-col h-[calc(100vh-73px)]">
      {/* Map Area */}
      <div className="flex-1 bg-blue-100 relative overflow-hidden">
        {/* Simple Map Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#136dec 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="relative inline-block">
              <MapPin className={`w-12 h-12 ${isCompleted ? 'text-green-500' : 'text-blue-600'} mb-4 ${!isCompleted && 'animate-bounce'}`} />
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-2 ${isCompleted ? 'bg-green-100' : 'bg-blue-100'} rounded-full blur-sm`}></div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isCompleted ? 'Technician Finished Work' : 'Technician is On the Way'}
            </h2>
            <p className="text-gray-600 text-sm max-w-[250px] mx-auto mt-2">
              {isCompleted
                ? 'The job has been marked as completed. Please finalize the payment.'
                : 'Your expert is navigating through traffic to reach your location.'}
            </p>
          </div>
        </div>

        {/* Floating Back Button (Mobile) */}
        <button
          onClick={() => navigate('/customer/home')}
          className="absolute top-4 left-4 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 lg:hidden"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Bottom Panel */}
      <div className="bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.08)] p-6 lg:p-8 shrink-0 z-10 border-t border-gray-100">
        <div className="max-w-xl mx-auto">
          {/* Technician Details */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              {technicianData.image ? (
                <img
                  src={technicianData.image}
                  alt={technicianData.name}
                  className="w-16 h-16 rounded-3xl object-cover border-4 border-blue-50"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + technicianData.name; }}
                />
              ) : (
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border-4 border-blue-50">
                  <span className="text-white font-bold text-xl">{technicianData.name[0]}</span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg truncate uppercase tracking-tight">{technicianData.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-wider">{technicianData.role}</span>
                <span className="text-sm font-bold text-orange-500 flex items-center gap-0.5">⭐ {technicianData.rating}</span>
              </div>
            </div>

            {!isCompleted && (
              <div className="bg-gray-50 px-4 py-2 rounded-2xl text-center border border-gray-100">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">ETA</p>
                <p className="text-blue-600 font-black text-lg leading-none">{technicianData.eta}</p>
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="space-y-4">
            {/* Pay Now Button (Always show if not completed/paid, but styled differently if on-the-way) */}
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessing}
              className={`w-full ${isCompleted ? 'bg-[#136dec] h-16' : 'bg-green-600 h-14'} text-white rounded-3xl font-black text-lg shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 hover:opacity-90`}
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  {isCompleted ? 'PAY NOW - RAZORPAY' : `PAY NOW (₹${billAmount})`}
                  <CreditCard className="w-6 h-6" />
                </>
              )}
            </button>

            {!isCompleted && (
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gray-50 text-gray-700 py-4 rounded-3xl font-bold flex items-center justify-center gap-3 border border-gray-100 hover:bg-gray-100 transition-all active:scale-95">
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </button>

                <button
                  onClick={() => {
                    if (ongoingBooking?.technicianEmail) {
                      navigate(`/customer/chat/${encodeURIComponent(ongoingBooking.technicianEmail)}`, {
                        state: {
                          contact: {
                            id: ongoingBooking.technicianEmail,
                            name: ongoingBooking.technicianName,
                            role: 'Technician'
                          }
                        }
                      });
                    }
                  }}
                  className="bg-blue-50 text-blue-600 py-4 rounded-3xl font-bold flex items-center justify-center gap-3 border border-blue-100/50 hover:bg-blue-100 transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/customer/home')}
            className="w-full mt-6 text-gray-400 font-bold text-sm uppercase tracking-[0.2em] hover:text-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}