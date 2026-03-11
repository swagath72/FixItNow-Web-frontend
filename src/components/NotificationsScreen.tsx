import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, MessageSquare, Mail, CheckCircle } from 'lucide-react';

export function NotificationsScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [settings, setSettings] = useState({
    bookingUpdates: true,
    promotions: true,
    chatMessages: true,
    emailNotifications: false,
    smsNotifications: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-3xl lg:rounded-3xl lg:m-6 shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition lg:hidden"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold">Notifications</h1>
        <p className="text-white/90">Manage your alerts & preferences</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-6 space-y-6">
        {/* Notification Types */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Notification Types</h2>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Booking Updates</p>
                <p className="text-sm text-gray-500">Get notified about your bookings</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('bookingUpdates')}
              className={`w-12 h-6 rounded-full transition ${settings.bookingUpdates ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.bookingUpdates ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-3 rounded-xl">
                <CheckCircle className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Promotions</p>
                <p className="text-sm text-gray-500">Offers & special deals</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('promotions')}
              className={`w-12 h-6 rounded-full transition ${settings.promotions ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.promotions ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Chat Messages</p>
                <p className="text-sm text-gray-500">New messages from technicians</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('chatMessages')}
              className={`w-12 h-6 rounded-full transition ${settings.chatMessages ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.chatMessages ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>
        </div>

        {/* Delivery Methods */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Delivery Methods</h2>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Text messages</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('smsNotifications')}
              className={`w-12 h-6 rounded-full transition ${settings.smsNotifications ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <Mail className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Email updates</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('emailNotifications')}
              className={`w-12 h-6 rounded-full transition ${settings.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
