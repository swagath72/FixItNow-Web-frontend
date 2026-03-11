import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Navigation, Plus, Search, Home, Briefcase, Map } from 'lucide-react';

export function CustomerLocationScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const savedAddresses = [
    {
      id: 1,
      type: 'Home',
      icon: Home,
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      icon: Briefcase,
      address: '456 Tech Blvd, Suite 200',
      city: 'San Francisco',
      state: 'CA',
      isDefault: false
    }
  ];

  const handleSelectAddress = (addr: any) => {
    localStorage.setItem('userLocation', JSON.stringify({
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zipCode: '94105'
    }));
    navigate('/customer/home');
  };

  const handleUseCurrentLocation = () => {
    localStorage.setItem('userLocation', JSON.stringify({
      address: '789 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103'
    }));
    navigate('/customer/home');
  };

  return (
    <div className="pb-28">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Change Location</h1>
        </div>

        <div className="relative mt-2">

          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for an area, street, or landmark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl shadow-md border-2 border-transparent focus:border-blue-300 focus:outline-none text-gray-900"
          />
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Current Location Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={handleUseCurrentLocation}
          className="w-full flex items-center gap-4 bg-white p-4 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-blue-50 hover:border-blue-200 transition-all text-left"
        >
          <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
            <Navigation className="w-6 h-6 text-[#136dec]" />
          </div>
          <div>
            <h3 className="font-bold text-[#136dec] text-[16px]">Use Current Location</h3>
            <p className="text-gray-500 text-sm">Enable location services for better accuracy</p>
          </div>
        </motion.button>

        {/* Add Another Address */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/location-selection')}
          className="w-full flex items-center gap-4 bg-white p-4 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-gray-200 transition-all text-left"
        >
          <div className="bg-gray-50 p-3 rounded-xl flex-shrink-0">
            <Plus className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-[16px]">Add Another Address</h3>
            <p className="text-gray-500 text-sm">Save a new location for future bookings</p>
          </div>
        </motion.button>

        {/* Saved Addresses */}
        <div>
          <h2 className="font-bold text-gray-900 text-[18px] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            Saved Addresses
          </h2>
          <div className="space-y-3">
            {savedAddresses.map((addr, index) => (
              <motion.button
                key={addr.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                onClick={() => handleSelectAddress(addr)}
                className="w-full flex items-center gap-4 bg-white p-4 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-[#136dec] transition-all text-left group"
              >
                <div className="bg-gray-50 p-3 rounded-xl flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                  <addr.icon className="w-6 h-6 text-gray-500 group-hover:text-[#136dec] transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-[16px]">{addr.type}</h3>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold bg-blue-100 text-[#136dec] px-2 py-0.5 rounded-full">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-snug">
                    {addr.address}, {addr.city}, {addr.state}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
