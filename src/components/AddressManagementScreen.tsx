import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Home, Briefcase, MapPin, Edit, Trash2 } from 'lucide-react';

export function AddressManagementScreen() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      label: 'Home',
      address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
      isDefault: true,
    },
    {
      id: 2,
      type: 'office',
      label: 'Office',
      address: '456 Market Street, Suite 200, San Francisco, CA 94103',
      isDefault: false,
    },
  ]);

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="pb-12">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Addresses</h1>
        <p className="text-gray-600">Your saved locations</p>
      </div>


      {/* Add New Button */}
      <div className="px-6 mt-6">
        <motion.button
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white border-2 border-dashed border-blue-300 rounded-2xl p-4 hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-blue-600">Add New Address</span>
        </motion.button>
      </div>

      {/* Address List */}
      <div className="px-6 mt-6 pb-6 space-y-4">
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md relative"
          >
            {address.isDefault && (
              <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Default
              </span>
            )}

            <div className="flex items-start gap-3 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                {address.type === 'home' ? (
                  <Home className="w-5 h-5 text-white" />
                ) : (
                  <Briefcase className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{address.label}</h3>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">{address.address}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-100 transition">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
