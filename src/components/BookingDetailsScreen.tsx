import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Clock, MessageSquare } from 'lucide-react';

export function BookingDetailsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { service, serviceType } = location.state || {};

  const [address, setAddress] = useState('123 Main Street, San Francisco');
  const [date, setDate] = useState('2026-02-13');
  const [time, setTime] = useState('10:00');
  const [description, setDescription] = useState('');

  const handleBookNow = () => {
    navigate('/customer/technicians', {
      state: {
        ...location.state,
        address,
        date,
        time,
        description
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition lg:hidden"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold">Booking Details</h1>
        <p className="text-white/90">{service}</p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 mt-6 pb-24 max-w-4xl mx-auto"
      >
        <div className="space-y-4">
          {/* Address */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Date */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Time */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Describe the issue
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about the problem..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white p-6 shadow-lg border-t z-10 transition-all">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBookNow}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
