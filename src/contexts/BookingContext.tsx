import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import API from '../api';


interface OngoingBooking {
  id: string;
  serviceName: string;
  technicianName: string;
  technicianEmail: string;
  status: 'confirmed' | 'on-the-way' | 'in-progress' | 'completed';
  estimatedTime: string;
  price?: string;
}

interface BookingContextType {
  ongoingBooking: OngoingBooking | null;
  setOngoingBooking: (booking: OngoingBooking | null) => void;
  completeBooking: () => void;
  updateBookingStatus: (status: OngoingBooking['status']) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [ongoingBooking, setOngoingBooking] = useState<OngoingBooking | null>(() => {
    const saved = localStorage.getItem('ongoingBooking');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const fetchActiveBooking = async () => {
      try {
        const res = await API.get('/active-bookings');
        const active = res.data;
        if (active && active.length > 0) {
          // Take the most recent active booking
          const b = active[0];
          
          // Map backend status to frontend status
          let mappedStatus: OngoingBooking['status'] = 'confirmed';
          const lowerStatus = (b.status || '').toLowerCase();
          
          if (['completed', 'finished', 'pending payment', 'paid'].includes(lowerStatus)) {
            mappedStatus = 'completed';
          } else if (['on-the-way', 'on the way', 'technician assigned'].includes(lowerStatus)) {
            mappedStatus = 'on-the-way';
          } else if (['in-progress', 'in progress', 'job started', 'started'].includes(lowerStatus)) {
            mappedStatus = 'in-progress';
          }

          setOngoingBooking({
            id: String(b.id),
            serviceName: b.service_name || 'Service',
            technicianName: b.technician_name || 'Technician',
            technicianEmail: b.technician_email || '',
            status: mappedStatus,
            estimatedTime: '15 mins', // Default or fetch if available
            price: b.cost || b.amount || localStorage.getItem('selectedServicePrice') || '₹500',
          });
        } else {
          setOngoingBooking(null);
        }
      } catch (err) {
        console.error('Failed to sync active booking:', err);
      }
    };

    fetchActiveBooking();
  }, []);

  useEffect(() => {
    if (ongoingBooking) {
      localStorage.setItem('ongoingBooking', JSON.stringify(ongoingBooking));
    } else {
      localStorage.removeItem('ongoingBooking');
    }
  }, [ongoingBooking]);

  const completeBooking = () => {
    setOngoingBooking(null);
  };

  const updateBookingStatus = (status: OngoingBooking['status']) => {
    if (ongoingBooking) {
      setOngoingBooking({ ...ongoingBooking, status });
    }
  };


  return (
    <BookingContext.Provider
      value={{
        ongoingBooking,
        setOngoingBooking,
        completeBooking,
        updateBookingStatus,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
