import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Phone, MessageCircle, CreditCard, ChevronLeft, Loader2 } from 'lucide-react';

import { useBooking } from '../contexts/BookingContext';
import API from '../api';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to fix Leaflet map sizing issues after mount
function MapSizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export function LiveTrackingScreen() {
  const navigate = useNavigate();
  const { ongoingBooking, updateBookingStatus, completeBooking } = useBooking();
  const [currentStatus, setCurrentStatus] = useState(ongoingBooking?.status || 'on-the-way');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use price from booking context or default to 500
  const parsePrice = (str: string) => {
    if (!str) return 500;
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 500;
  };
  
  const initialAmount = parsePrice(ongoingBooking?.price || localStorage.getItem('selectedServicePrice') || '500');
  const [billAmount, setBillAmount] = useState(initialAmount);

  const [technicianData, setTechnicianData] = useState({
    name: ongoingBooking?.technicianName || 'Technician',
    image: '',
    rating: 4.9,
    role: ongoingBooking?.serviceName || 'Expert Technician',
    eta: ongoingBooking?.estimatedTime || '15 mins'
  });

  // Locations for the map (Default to Chennai)
  const [customerPosition, setCustomerPosition] = useState<[number, number]>([13.0827, 80.2707]); 
  const [technicianPosition, setTechnicianPosition] = useState<[number, number]>([13.0927, 80.2807]);

  const fetchRealLocations = useCallback(async () => {
    if (!ongoingBooking?.id) return;
    
    try {
      // 1. Fetch Technician Location (Using general user location to avoid role issues)
      if (ongoingBooking.technicianEmail) {
        const techRes = await API.get(`/get-user-location/${encodeURIComponent(ongoingBooking.technicianEmail)}`);
        if (techRes.data.latitude && techRes.data.longitude) {
          setTechnicianPosition([parseFloat(techRes.data.latitude), parseFloat(techRes.data.longitude)]);
        }
      }

      // 2. Fetch Customer Location
      const email = localStorage.getItem('userEmail');
      if (email) {
        const userRes = await API.get(`/get-user-location/${encodeURIComponent(email)}`);
        if (userRes.data.latitude && userRes.data.longitude) {
          setCustomerPosition([parseFloat(userRes.data.latitude), parseFloat(userRes.data.longitude)]);
        }
      }
    } catch (err) {
      console.error('Location sync error:', err);
    }
  }, [ongoingBooking]);

  const fetchLatestStatus = useCallback(async () => {
    if (!ongoingBooking?.id) return;
    try {
      const response = await API.get(`/booking/${ongoingBooking.id}`);
      const data = response.data;

      // Also sync locations during status poll
      fetchRealLocations();
      
      // Update technician info if available
      if (data.technician_name) {
        setTechnicianData(prev => ({
          ...prev,
          name: data.technician_name,
          image: data.technician_profile_pic || '',
          role: data.service_name || prev.role
        }));

        // Fetch technician's current location from database (Using general user location to avoid role issues)
        try {
          const locRes = await API.get(`/get-user-location/${encodeURIComponent(data.technician_email)}`);
          if (locRes.data.latitude && locRes.data.longitude) {
            setTechnicianPosition([parseFloat(locRes.data.latitude), parseFloat(locRes.data.longitude)]);
          }
        } catch (e) {
          console.error("Error fetching tech location:", e);
        }
      }

      // Update bill amount if available from backend
      if (data.cost || data.amount) {
        setBillAmount(parsePrice(data.cost || String(data.amount)));
      } else if (ongoingBooking?.price || localStorage.getItem('selectedServicePrice')) {
        setBillAmount(parsePrice(ongoingBooking?.price || localStorage.getItem('selectedServicePrice') || '500'));
      }

      const backendStatus = data.status; // 'Pending' | 'Confirmed' | 'Technician Assigned' | 'Completed' | 'paid'

      if (['Completed', 'Pending Payment', 'finished'].includes((backendStatus || '').toLowerCase())) {
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
  }, [ongoingBooking, updateBookingStatus, completeBooking, navigate, fetchRealLocations]);

  useEffect(() => {
    if (!ongoingBooking) {
      navigate('/customer/home');
    }
  }, [ongoingBooking, navigate]);

  useEffect(() => {
    // Initial fetch
    fetchLatestStatus();
    fetchRealLocations();

    // Status polling
    const pollInterval = setInterval(fetchLatestStatus, 5000);
    return () => clearInterval(pollInterval);
  }, [fetchLatestStatus, fetchRealLocations]);

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
      <div className="relative flex-1 min-h-[400px] bg-gray-100 overflow-hidden">
        <MapContainer 
          key={ongoingBooking?.id || 'default-map'}
          center={customerPosition} 
          zoom={13} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
          zoomControl={false}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={technicianPosition} />
          <Marker position={customerPosition} />
          <MapSizer />
        </MapContainer>

        {/* Overlay Info (Mobile style) */}
        {!isCompleted && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 z-[1000] lg:hidden">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Status</p>
            <p className="text-blue-600 font-black text-sm leading-none animate-pulse">On the Way</p>
          </div>
        )}

        <div className="absolute inset-0 flex items-end justify-center pointer-events-none p-6 z-[1000]">
          <div className="text-center mb-8 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-xl pointer-events-auto max-w-[90%]">
            <h2 className="text-lg font-bold text-gray-900">
              {isCompleted ? 'Technician Finished Work' : 'Technician is On the Way'}
            </h2>
            <p className="text-gray-600 text-[12px] mt-1 leading-snug">
              {isCompleted
                ? 'The job has been marked as completed. Please finalize the payment.'
                : 'Your expert is navigating through traffic.'}
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