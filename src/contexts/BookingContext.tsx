import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';


interface OngoingBooking {
  id: string;
  serviceName: string;
  technicianName: string;
  technicianEmail: string;
  status: 'confirmed' | 'on-the-way' | 'in-progress' | 'completed';
  estimatedTime: string;
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
