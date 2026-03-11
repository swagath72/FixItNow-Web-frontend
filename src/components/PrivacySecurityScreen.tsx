import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Key, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

export function PrivacySecurityScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    biometricLogin: true,
    loginAlerts: true,
    dataSharing: false,
    activityTracking: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const sessions = [
    {
      device: 'iPhone 13 Pro',
      location: 'San Francisco, CA',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      lastActive: '3 days ago',
      current: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-white" />
          <h1 className="text-white text-2xl font-bold">Privacy & Security</h1>
        </div>
        <p className="text-white/90">Manage your security settings</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Change Password */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Change Password</h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-5 shadow-md space-y-4"
          >
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">New Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Confirm Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handlePasswordChange}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Update Password
            </button>
          </motion.div>
        </div>

        {/* Security Settings */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Security Settings</h2>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Extra security via SMS/Email</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('twoFactorAuth')}
              className={`w-12 h-6 rounded-full transition ${
                settings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
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
              <div className="bg-blue-100 p-3 rounded-xl">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Biometric Login</p>
                <p className="text-sm text-gray-500">Face ID / Fingerprint</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('biometricLogin')}
              className={`w-12 h-6 rounded-full transition ${
                settings.biometricLogin ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.biometricLogin ? 'translate-x-6' : 'translate-x-0.5'
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
              <div className="bg-yellow-100 p-3 rounded-xl">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Login Alerts</p>
                <p className="text-sm text-gray-500">Notify on new login</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('loginAlerts')}
              className={`w-12 h-6 rounded-full transition ${
                settings.loginAlerts ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.loginAlerts ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </motion.div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Privacy Settings</h2>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Data Sharing</p>
                <p className="text-sm text-gray-500">Share data for improvements</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('dataSharing')}
              className={`w-12 h-6 rounded-full transition ${
                settings.dataSharing ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.dataSharing ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Eye className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Activity Tracking</p>
                <p className="text-sm text-gray-500">Track app usage</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('activityTracking')}
              className={`w-12 h-6 rounded-full transition ${
                settings.activityTracking ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.activityTracking ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </motion.div>
        </div>

        {/* Active Sessions */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Active Sessions</h2>
          <div className="space-y-3">
            {sessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-500">{session.location}</p>
                    </div>
                  </div>
                  {session.current && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Last active: {session.lastActive}</p>
                  {!session.current && (
                    <button className="text-sm text-red-600 font-semibold hover:underline">
                      Revoke
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data & Privacy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-md"
        >
          <h3 className="font-bold text-gray-900 mb-3">Data & Privacy</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <p className="font-semibold text-gray-900">Download My Data</p>
              <p className="text-sm text-gray-500">Get a copy of your data</p>
            </button>
            <button className="w-full text-left p-3 bg-red-50 rounded-xl hover:bg-red-100 transition">
              <p className="font-semibold text-red-600">Delete My Account</p>
              <p className="text-sm text-red-500">Permanently delete your account</p>
            </button>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-blue-50 rounded-2xl p-4 flex gap-3"
        >
          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-blue-900 mb-1">Your data is safe with us</p>
            <p>We use industry-standard encryption and never share your personal information with third parties without your consent.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
