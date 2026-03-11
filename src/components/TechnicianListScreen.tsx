import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Phone, MessageCircle, CheckCircle2, Search, Loader2 } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import API from '../api';

export function TechnicianListScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [assignedTechnician, setAssignedTechnician] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const { setOngoingBooking } = useBooking();
  const BASE_URL = 'http://localhost:8000';

  const buildPicUrl = (picUrl?: string | null) => {
    if (!picUrl) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
    if (picUrl.startsWith('http')) return picUrl;
    return `${BASE_URL}${picUrl}`;
  };

  const technicians = [
    {
      id: 1,
      name: 'Mike Johnson',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'David Smith',
      rating: 4.8,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Robert Brown',
      rating: 4.7,
      reviews: 82,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
  ];

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await API.get('/technicians');
        const techs = res.data;
        if (techs.length > 0) {
          const randomTech = techs[Math.floor(Math.random() * techs.length)];
          setAssignedTechnician({
            id: randomTech.id,
            name: randomTech.full_name,
            email: randomTech.email,
            rating: randomTech.rating || '4.5',
            reviews: Math.floor(Math.random() * 200) + 10,
            image: buildPicUrl(randomTech.profile_pic_url)
          });
        } else {
          setAssignedTechnician(technicians[0]);
        }
      } catch (err) {
        setAssignedTechnician(technicians[0]);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(() => {
      fetchTechs();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = async () => {
    if (!assignedTechnician || isBooking) return;

    setIsBooking(true);
    const selectedService = localStorage.getItem('selectedService') || 'Service';

    try {
      const { address, date, time, description } = location.state || {};

      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-GB')
        : new Date().toLocaleDateString('en-GB');

      const payload = {
        address: address || '123 Main Street',
        date: formattedDate,
        time: time || '10:00',
        description: description || 'Routine service',
        service_name: selectedService,
        technician_id: assignedTechnician.id,
        technician_name: assignedTechnician.name,
        customer_name: user?.full_name || user?.name || user?.email?.split('@')[0] || 'Customer',
        cost: '₹500'
      };

      const currentToken = localStorage.getItem('token');
      const res = await API.post('/create-booking', payload, {
        headers: {
          Authorization: currentToken ? `Bearer ${currentToken}` : undefined
        }
      });

      const bookingId = res.data.id || assignedTechnician.id;

      setOngoingBooking({
        id: bookingId.toString(),
        serviceName: selectedService,
        technicianName: assignedTechnician.name,
        technicianEmail: assignedTechnician.email,
        status: 'confirmed',
        estimatedTime: '15 mins'
      });


      navigate('/customer/tracking');
    } catch (e) {
      console.error('Failed to create booking', e);
      setOngoingBooking({
        id: assignedTechnician.id.toString(),
        serviceName: selectedService,
        technicianName: assignedTechnician.name,
        technicianEmail: assignedTechnician.email,
        status: 'confirmed',
        estimatedTime: '15 mins'
      });
      navigate('/customer/tracking');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="pb-28">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {isSearching ? 'Finding Technician...' : 'Technician Assigned'}
        </h1>
        <p className="text-gray-600">
          {isSearching ? 'Please wait while we match you with the best expert.' : 'We found the perfect technician for your job!'}
        </p>
      </div>


      <div className="px-6 mt-10 space-y-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                  <Search className="w-8 h-8 text-[#136dec]" />
                </div>
                <Loader2 className="w-24 h-24 text-[#136dec] absolute -inset-2 animate-spin" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Searching for experts...</h3>
              <p className="text-gray-500 text-center mt-2">Checking availability in your area</p>
            </motion.div>
          ) : (
            <motion.div
              key="assigned"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-md bg-white rounded-[20px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-2 border-[#136dec] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#136dec] text-white text-[10px] font-bold px-3 py-1 rounded-bl-[12px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> BEST MATCH
              </div>

              <div className="flex gap-4 mt-2">
                <img
                  src={assignedTechnician.image}
                  alt={assignedTechnician.name}
                  className="w-[90px] h-[90px] rounded-[16px] object-cover flex-shrink-0 shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#0f172a] text-[18px]">{assignedTechnician.name}</h3>
                  <div className="flex items-center gap-1 mt-1 mb-3">
                    <Star className="w-4 h-4 text-[#f59e0b]" fill="currentColor" />
                    <span className="font-bold text-[#0f172a] text-[14px]">{assignedTechnician.rating}</span>
                    <span className="text-[13px] text-[#64748b]">({assignedTechnician.reviews} reviews)</span>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 flex justify-center items-center gap-2 py-2 bg-[#f1f5f9] rounded-xl hover:bg-[#e2e8f0] transition text-[#475569] font-medium text-[13px]">
                      <Phone className="w-4 h-4" /> Call
                    </button>
                    <button
                      onClick={() => {
                        if (assignedTechnician?.email) {
                          navigate(`/customer/chat/${encodeURIComponent(assignedTechnician.email)}`, {
                            state: {
                              contact: {
                                id: assignedTechnician.email,
                                name: assignedTechnician.name,
                                role: 'Technician'
                              }
                            }
                          });
                        }
                      }}
                      className="flex-1 flex justify-center items-center gap-2 py-2 bg-[#f1f5f9] rounded-xl hover:bg-[#e2e8f0] transition text-[#475569] font-medium text-[13px]"
                    >
                      <MessageCircle className="w-4 h-4" /> Message
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isSearching && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-center">
            <button
              onClick={handleBookNow}
              disabled={isBooking}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all bg-[#136dec] text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isBooking && <Loader2 className="w-5 h-5 animate-spin" />}
              {isBooking ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
