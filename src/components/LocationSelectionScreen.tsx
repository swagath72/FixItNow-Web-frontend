import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, Navigation, Zap } from 'lucide-react';

export function LocationSelectionScreen() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [isFetching, setIsFetching] = useState(false);

  const handleContinue = () => {
    if (location.address && location.city) {
      localStorage.setItem('userLocation', JSON.stringify(location));
      navigate('/customer/home');
    }
  };

  const fetchLocationData = async (pincode: string) => {
    if (pincode.length !== 6) return;
    
    setIsFetching(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const info = data[0].PostOffice[0];
        setLocation(prev => ({
          ...prev,
          city: info.District,
          state: info.State
        }));
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setLocation({ ...location, zipCode: value });
    if (value.length === 6) {
      fetchLocationData(value);
    }
  };

  const handleUseCurrentLocation = () => {
    // In a real app, this would use geolocation API
    setLocation({
      address: '123 Main Street',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600012',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Illustration (Desktop) */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#136dec] to-purple-600 p-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 mb-8">
              <MapPin className="w-32 h-32 text-white mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-white mb-4">
                Find Services Near You
              </h2>
              <p className="text-xl text-white/90">
                We'll connect you with the best technicians in your area
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center p-6 lg:p-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-3 rounded-2xl shadow-lg">
                  <Zap className="w-10 h-10 text-white" fill="white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent mb-2">
                FIXIT NOW
              </h1>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-[#136dec] to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3">
                  Set Your Location
                </h2>
                <p className="text-gray-600 text-lg">
                  We need your location to find nearby technicians
                </p>
              </div>

              <div className="space-y-5 mb-6">
                {/* Address */}
                <div>
                  <label className="text-gray-700 font-bold mb-2 block text-sm">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-gray-700 font-bold mb-2 block text-sm">
                    City *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={location.city}
                      onChange={(e) => setLocation({ ...location, city: e.target.value })}
                      placeholder="e.g. Chennai"
                      className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none transition-all disabled:opacity-75"
                    />
                    {isFetching && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-[#136dec] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* State & Zip */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 font-bold mb-2 block text-sm">
                      State *
                    </label>
                    <input
                      type="text"
                      value={location.state}
                      onChange={(e) => setLocation({ ...location, state: e.target.value })}
                      placeholder="e.g. Tamil Nadu"
                      className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none transition-all uppercase disabled:opacity-75"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-bold mb-2 block text-sm">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      value={location.zipCode}
                      onChange={handlePincodeChange}
                      placeholder="600012"
                      maxLength={6}
                      className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Use Current Location */}
              <motion.button
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                onClick={handleUseCurrentLocation}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-[#136dec] text-[#136dec] py-4 rounded-xl font-bold mb-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Use Current Location
              </motion.button>

              {/* Continue Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onClick={handleContinue}
                disabled={!location.address || !location.city}
                whileHover={{ scale: !location.address || !location.city ? 1 : 1.02 }}
                whileTap={{ scale: !location.address || !location.city ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
              >
                Continue to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
