import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Wrench, CreditCard } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

export function OngoingBookingBar() {
  const navigate = useNavigate();
  const { ongoingBooking } = useBooking();

  // Don't show if no booking
  if (!ongoingBooking) {
    return null;
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { color: '#136dec', icon: Clock };
      case 'on-the-way':
        return { color: '#f97316', icon: MapPin };
      case 'in-progress':
        return { color: '#10b981', icon: Wrench };
      case 'completed':
        return { color: '#10b981', icon: CreditCard };
      default:
        return { color: '#136dec', icon: Clock };
    }
  };

  const statusConfig = getStatusConfig(ongoingBooking.status);
  const StatusIcon = statusConfig.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed bottom-[84px] lg:bottom-10 right-6 lg:right-10 z-50"
      >
        <button
          onClick={() => navigate('/customer/tracking')}
          className="relative group flex items-center justify-center"
        >
          {/* Pulsing ring background */}
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: statusConfig.color }}
          ></div>
          
          {/* Main Circular Button */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-[3px] border-white z-10 transition-transform group-hover:scale-105"
            style={{ backgroundColor: statusConfig.color }}
          >
            <StatusIcon className="w-7 h-7 text-white" />
          </div>
          
          {/* Tooltip on hover/active (desktop mainly, but helps show context) */}
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-2xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap flex flex-col items-end">
            <span className="text-[#0f172a] font-bold text-sm">Track Technician</span>
            <span className="text-gray-500 text-xs">Tap to view map</span>
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
