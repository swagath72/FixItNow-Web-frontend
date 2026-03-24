import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Camera, Edit, Phone, Mail, MapPin, LogOut,
  CreditCard, Bell, Shield, HelpCircle, Star,
  Settings, Heart, FileText, ChevronRight,
  Wallet, Globe, MessageSquare, Loader2, User
} from 'lucide-react';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';

interface ProfileScreenProps {
  role?: 'customer' | 'technician';
}

export function ProfileScreen({ role = 'customer' }: ProfileScreenProps) {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const BASE_URL = 'http://localhost:8000';

  const buildPicUrl = (picUrl?: string | null) =>
    picUrl ? `${BASE_URL}${picUrl}` : null;

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || user?.full_name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    image: buildPicUrl(user?.profile_pic_url)
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/me');
        const data = res.data;
        const pic = buildPicUrl(data.profile_pic_url);

        setProfile({
          name: data.full_name || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          image: pic
        });

        if (data.profile_pic_url) {
          updateUser({ profile_pic_url: data.profile_pic_url });
        }

        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...currentUser, ...data }));
      } catch (err) {
        if (user) {
          setProfile((prev: any) => ({
            ...prev,
            name: user.name || user.full_name || prev.name,
            phone: user.phone || prev.phone,
            email: user.email || prev.email,
            image: buildPicUrl(user.profile_pic_url) ?? prev.image
          }));
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    const token = localStorage.getItem('token');
    try {
      const res = await API.put('/users/me', {
        full_name: profile.name,
        phone: profile.phone,
        email: profile.email,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      updateUser({
        name: res.data.full_name,
        full_name: res.data.full_name,
        phone: res.data.phone,
        email: res.data.email,
        profile_pic_url: res.data.profile_pic_url,
      });
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...currentUser, ...res.data }));
    } catch (err: any) {
      console.error('Save profile error:', err.response?.data || err.message);
      let errorMessage = 'Failed to save changes. Please try again.';

      const responseData = err.response?.data;
      if (responseData?.detail) {
        if (typeof responseData.detail === 'string') {
          errorMessage = `Error: ${responseData.detail}`;
        } else if (Array.isArray(responseData.detail)) {
          errorMessage = `Error: ${responseData.detail.map((d: any) => d.msg).join(', ')}`;
        }
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }

      setSaveError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: { target: HTMLInputElement }) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await API.post('/users/me/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      const newPicUrl = res.data.profile_pic_url;
      setProfile(prev => ({ ...prev, image: `${BASE_URL}${newPicUrl}` }));
      updateUser({ profile_pic_url: newPicUrl });
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...currentUser, profile_pic_url: newPicUrl }));
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setSaveError(detail ? `Photo upload failed: ${detail}` : 'Photo upload failed. Please try again.');
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const accountSettings = [
    { icon: CreditCard, color: 'blue', label: 'Payment Methods', desc: 'Manage cards & wallets', path: `/${role}/payment-methods` },
    { icon: Bell, color: 'yellow', label: 'Notifications', desc: 'Alerts & preferences', path: `/${role}/notifications` },
    { icon: Shield, color: 'purple', label: 'Privacy & Security', desc: 'Password, 2FA, data', path: `/${role}/privacy-security` },
    { icon: Globe, color: 'indigo', label: 'Language', desc: 'English (US)', path: `/${role}/language` },
  ];

  const moreOptions = role === 'customer'
    ? [
      { icon: Heart, color: 'red', label: 'Favorite Technicians', desc: 'Your saved pros', path: `/${role}/favorites` },
      { icon: Star, color: 'yellow', label: 'My Reviews', desc: 'View all ratings', path: `/${role}/my-reviews` },
    ]
    : [
      { icon: FileText, color: 'blue', label: 'Job History', desc: 'Past work & details', path: `/${role}/history` },
      { icon: Wallet, color: 'green', label: 'My Earnings', desc: 'Revenue & payouts', path: `/${role}/earnings` },
    ];

  const supportOptions = [
    { icon: HelpCircle, color: 'teal', label: 'Help Center', desc: 'FAQs & support', path: `/${role}/help-center` },
    { icon: MessageSquare, color: 'cyan', label: 'Contact Support', desc: 'Chat with us', path: `/${role}/chat-list` },
    { icon: FileText, color: 'slate', label: 'Terms & Conditions', desc: 'Legal information', path: `/${role}/terms` },
    { icon: Settings, color: 'gray', label: 'App Settings', desc: 'Preferences & cache', path: `/${role}/app-settings` },
  ];

  return (
    <div className="pb-12">
      <div className="max-w-7xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>


      <div className="max-w-7xl mx-auto px-6 pb-8 mt-6 lg:mt-0">
        <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {profile.image ? (
                      <img
                        src={profile.image}
                        alt="Profile"
                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-xl object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-4xl">
                          {profile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
                        </span>
                      </div>
                    )}
                    <input
                      id="photo-upload-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('photo-upload-input')?.click()}
                      disabled={uploadingPhoto}
                      className="absolute bottom-0 right-0 bg-[#136dec] p-3 rounded-full shadow-lg hover:bg-blue-700 transition disabled:opacity-60"
                      title="Change profile photo"
                    >
                      {uploadingPhoto ? (
                        <svg className="w-5 h-5 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      ) : (
                        <Camera className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-gray-600 text-sm mb-2 font-semibold">
                      <User className="w-4 h-4 text-[#136dec]" />
                      Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none"
                      />
                    ) : (
                      <p className="font-bold text-[#0f172a] text-lg">{profile.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-600 text-sm mb-2 font-semibold">
                      <Phone className="w-4 h-4 text-[#136dec]" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none"
                      />
                    ) : (
                      <p className="font-semibold text-[#0f172a]">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-600 text-sm mb-2 font-semibold">
                      <Mail className="w-4 h-4 text-[#136dec]" />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#136dec] focus:outline-none"
                      />
                    ) : (
                      <p className="font-semibold text-[#0f172a]">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-600 text-sm mb-2 font-semibold">
                      <MapPin className="w-4 h-4 text-[#136dec]" />
                      {role === 'technician' ? 'Service Area' : 'Default Address'}
                    </label>
                    <p className="font-semibold text-[#0f172a] mb-2">{profile.address || (role === 'technician' ? 'San Francisco Bay Area' : 'No address set')}</p>
                    {role === 'customer' && (
                      <button
                        onClick={() => navigate('/customer/addresses')}
                        className="text-[#136dec] text-sm font-bold hover:underline"
                      >
                        Manage Addresses →
                      </button>
                    )}
                  </div>
                </div>

                {saveError && (
                  <p className="text-red-600 text-sm font-medium mt-2 text-center">{saveError}</p>
                )}

                <button
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-[#136dec] to-purple-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition mt-6 disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Edit className="w-5 h-5" />
                  )}
                  {isEditing ? (saving ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
                </button>
              </motion.div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Account Settings</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {accountSettings.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onClick={() => navigate(item.path)}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-gray-200 transition text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`bg-${item.color}-100 p-3 rounded-xl`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                          </div>
                          <div>
                            <p className="font-bold text-[#0f172a]">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">More Options</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {moreOptions.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      onClick={() => navigate(item.path)}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-gray-200 transition text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`bg-${item.color}-100 p-3 rounded-xl`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                          </div>
                          <div>
                            <p className="font-bold text-[#0f172a]">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Support</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {supportOptions.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      onClick={() => navigate(item.path)}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-gray-200 transition text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`bg-${item.color}-100 p-3 rounded-xl`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                          </div>
                          <div>
                            <p className="font-bold text-[#0f172a]">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={handleLogout}
                className="w-full bg-red-50 text-red-600 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-red-100 transition shadow-lg"
              >
                <LogOut className="w-6 h-6" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
