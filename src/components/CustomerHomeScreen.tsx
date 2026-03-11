import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, Zap, Droplet, AlertCircle, Clock, ChevronRight, TrendingUp, Loader2 } from 'lucide-react';
import { OngoingBookingBar } from './OngoingBookingBar';
import { useEffect, useState } from 'react';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';

export function CustomerHomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState('');
  const [recentBookings, setRecentBookings] = useState<{
    id: number;
    service: string;
    date: string;
    status: string;
    technician: string;
  }[]>([]);
  const [stats, setStats] = useState({ total: 0, thisMonth: 0 });
  const [loadingBookings, setLoadingBookings] = useState(true);

  const services = [
    {
      id: 'electrician',
      title: 'Electrician',
      icon: Zap,
      gradient: 'from-yellow-400 to-orange-500',
      image: 'https://images.unsplash.com/photo-1762330465376-b89b5584306d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmtpbmclMjBob21lfGVufDF8fHx8MTc3MDg2NzQwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: '24 Services Available',
    },
    {
      id: 'plumber',
      title: 'Plumber',
      icon: Droplet,
      gradient: 'from-blue-400 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1726931535180-d27a2ffd7474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwZml4aW5nJTIwcGlwZXxlbnwxfHx8fDE3NzA3OTA2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '23 Services Available',
    },
  ];

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const loc = JSON.parse(savedLocation);
      setUserLocation(`${loc.city}, ${loc.state}`);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoadingBookings(true);
      try {
        const currentToken = localStorage.getItem('token');
        const res = await API.get('/bookings', {
          headers: {
            Authorization: currentToken ? `Bearer ${currentToken}` : undefined
          }
        });
        const all = res.data as {
          id: number;
          service_name?: string;
          service_type?: string;
          service?: string;
          scheduled_date?: string;
          date?: string;
          status: string;
          technician_name?: string;
          technician?: string;
        }[];
        const mapped = all.map((b) => {
          let displayDate = b.date || '';
          // If it's in DD/MM/YYYY, try to make it look nicer
          if (displayDate.includes('/')) {
            const [d, m, y] = displayDate.split('/');
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            if (!isNaN(dateObj.getTime())) {
              displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
          }

          return {
            id: b.id,
            service: b.service_name || b.service_type || b.service || 'Service',
            date: displayDate,
            status: b.status,
            technician: b.technician_name || b.technician || 'TBD',
          };
        });

        // Sort by ID desc just in case
        const sorted = [...mapped].sort((a, b) => b.id - a.id);
        const recent = sorted.slice(0, 3);
        setRecentBookings(recent);

        const now = new Date();
        const thisMonth = mapped.filter((b) => {
          // b.date is now "Mar 8, 2026" or similar
          const d = new Date(b.date);
          return !isNaN(d.getTime()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length;
        setStats({ total: mapped.length, thisMonth });
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, []);

  const firstName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  const statCards = [
    { label: 'Total Bookings', value: String(stats.total), icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'This Month', value: String(stats.thisMonth), icon: Clock, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#136dec] to-purple-600 lg:rounded-3xl lg:mx-6 lg:mt-6 lg:shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-white text-3xl lg:text-4xl font-bold mb-2">
                Hello, {firstName}! 👋
              </h1>
              <p className="text-white/90 text-lg">What service do you need today?</p>
            </div>
          </div>


          {/* Stats Cards - Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-4 mt-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                    <p className="text-white text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Services Section */}
        <div className="mt-8 lg:mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a]">Our Services</h2>
            <button className="text-[#136dec] font-semibold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                onClick={() => navigate(`/customer/service/${service.id}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="h-48 lg:h-64 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <service.icon className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-white/90">{service.description}</p>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                  <span className="font-semibold text-[#0f172a]">Book Now</span>
                  <ChevronRight className="w-5 h-5 text-[#136dec] group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-10 lg:mt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a]">Recent Bookings</h2>
            <button
              onClick={() => navigate('/customer/history')}
              className="text-[#136dec] font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          {loadingBookings ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 text-[#136dec] animate-spin" />
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 shadow-lg text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No bookings yet. Book a service to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {recentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => navigate('/customer/history')}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${booking.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}>
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-[#0f172a] text-lg">{booking.service}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{booking.technician}</p>
                      <p className="text-sm text-gray-500">{booking.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <OngoingBookingBar />
    </div>
  );
}
