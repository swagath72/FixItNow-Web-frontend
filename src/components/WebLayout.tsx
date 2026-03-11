import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Home, Clock, MessageCircle, User, Zap, Menu, X,
  Bell, HelpCircle, Settings,
  LogOut, ChevronRight, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface WebLayoutProps {
  children: ReactNode;
  role?: 'customer' | 'technician';
  showSidebar?: boolean;
}

export function WebLayout({
  children,
  role,
  showSidebar = true,
}: WebLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const { user, logout } = useAuth();
  const userName = user?.full_name || user?.name || user?.email?.split('@')[0] || 'User';
  const BASE_URL = 'http://localhost:8000';
  const profilePicUrl = user?.profile_pic_url ? `${BASE_URL}${user.profile_pic_url}` : null;
  // Generate initials for fallback avatar
  const initials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const loc = JSON.parse(savedLocation);
      setUserLocation(`${loc.city}, ${loc.state}`);
    }
  }, []);

  const customerNavItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/customer/home' },
    { id: 'history', label: 'History', icon: Clock, path: '/customer/history' },
    { id: 'chat', label: 'Messages', icon: MessageCircle, path: '/customer/chat-list' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/customer/notifications' },
    { id: 'help', label: 'Help Center', icon: HelpCircle, path: '/customer/help-center' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/customer/app-settings' },
    { id: 'profile', label: 'Profile', icon: User, path: '/customer/profile' },
  ];

  const technicianNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/technician/dashboard' },
    { id: 'history', label: 'Job History', icon: Clock, path: '/technician/history' },
    { id: 'chat', label: 'Messages', icon: MessageCircle, path: '/technician/chat-list' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/technician/notifications' },
    { id: 'help', label: 'Help Center', icon: HelpCircle, path: '/technician/help-center' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/technician/app-settings' },
    { id: 'profile', label: 'Profile', icon: User, path: '/technician/profile' },
  ];

  const currentRole = (role || user?.role || 'customer').toLowerCase() as 'customer' | 'technician';
  const navItems = currentRole === 'customer' ? customerNavItems : technicianNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Web Header - Desktop Only */}
      <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

        <div className="w-full flex items-center justify-between py-4 pr-6">
          <div className="flex items-center gap-4">
            {/* Logo area aligned with sidebar width (w-64) */}
            <div className="w-64 px-4 flex items-center">
              <button
                onClick={() => navigate(currentRole === 'customer' ? '/customer/home' : '/technician/dashboard')}

                className="flex items-center gap-3 group"
              >
                <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-2.5 rounded-xl shadow-lg flex-shrink-0">
                  <Zap className="w-7 h-7 text-white" fill="white" />
                </div>
                <div className="text-left flex-shrink-0">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent leading-none">
                    FIXIT NOW
                  </h1>
                </div>
              </button>
            </div>

            {/* Location */}
            {currentRole === 'customer' && (

              <button
                onClick={() => navigate('/customer/location')}
                className="flex items-center gap-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                <MapPin className="w-4 h-4 text-[#136dec]" />
                <span className="text-sm font-medium">{userLocation || 'Set Location'}</span>
              </button>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/${currentRole}/notifications`)}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => navigate(`/${currentRole}/profile`)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              {/* Profile avatar - real image or initials fallback */}
              {profilePicUrl ? (
                <img
                  src={profilePicUrl}
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-blue-100"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{initials}</span>
                </div>
              )}
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-600 capitalize">{currentRole}</p>
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              {currentRole === 'customer' && (
                <button
                  onClick={() => navigate('/customer/location')}
                  className="flex flex-col items-start flex-1 min-w-0"
                >
                  <div className="flex items-center gap-1 w-full">
                    <MapPin className="w-4 h-4 text-[#136dec] flex-shrink-0" />
                    <span className="text-xs font-bold text-gray-800 truncate">
                      {userLocation ? 'Your Location' : 'Set Location'}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 w-full truncate text-left pl-5">
                    {userLocation || 'Select your area'}
                  </span>
                </button>
              )}
            </div>

            {currentRole !== 'customer' && (
              <button
                onClick={() => navigate('/technician/dashboard')}
                className="flex items-center gap-2"
              >
                <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-1.5 rounded-lg">
                  <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent">
                  FIXIT NOW
                </h1>
              </button>
            )}

            {currentRole === 'customer' && (
              <button
                onClick={() => navigate('/customer/home')}
                className="flex items-center gap-1.5"
              >
                <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-1.5 rounded-lg">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <h1 className="text-base font-bold bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent">
                  FIXIT NOW
                </h1>
              </button>
            )}

            <button
              onClick={() => navigate(`/${currentRole}/notifications`)}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>


      <div className="flex">
        {/* Desktop Sidebar */}
        {showSidebar && (
          <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed top-[73px] bottom-0 left-0 z-40 overflow-y-auto">

            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </aside>
        )}

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 25 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-2 rounded-xl">
                        <Zap className="w-6 h-6 text-white" fill="white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent">
                          FIXIT NOW
                        </h2>
                        <p className="text-xs text-gray-600">Menu</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 rounded-xl hover:bg-gray-100 transition"
                    >
                      <X className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>

                  {/* Profile Card */}
                  <div
                    onClick={() => {
                      navigate(`/${currentRole}/profile`);
                      setIsSidebarOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 mb-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Profile avatar in mobile sidebar */}
                      {profilePicUrl ? (
                        <img
                          src={profilePicUrl}
                          alt={userName}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white/40"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold text-xl">{initials}</span>
                        </div>
                      )}
                      <div className="text-white">
                        <p className="font-bold">{userName}</p>
                        <p className="text-sm opacity-90 capitalize">{currentRole}</p>
                      </div>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            navigate(item.path);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                          {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </button>
                      );
                    })}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all mt-4"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 relative ${showSidebar ? 'lg:ml-64' : ''}`}>
          {children}
        </main>
      </div>

    </div>
  );
}
