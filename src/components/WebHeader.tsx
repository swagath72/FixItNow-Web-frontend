import { useNavigate, useLocation } from 'react-router';
import { Home, Clock, MessageCircle, User, Bell, Menu, LogOut, Wallet } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WebHeaderProps {
  role: 'customer' | 'technician';
}

export function WebHeader({ role }: WebHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const customerNavItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/customer/home' },
    { id: 'history', label: 'History', icon: Clock, path: '/customer/history' },
    { id: 'chat', label: 'Messages', icon: MessageCircle, path: '/customer/chat-list' },
    { id: 'profile', label: 'Profile', icon: User, path: '/customer/profile' },
  ];

  const technicianNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/technician/dashboard' },
    { id: 'history', label: 'History', icon: Clock, path: '/technician/history' },
    { id: 'chat', label: 'Messages', icon: MessageCircle, path: '/technician/chat-list' },
    { id: 'profile', label: 'Profile', icon: User, path: '/technician/profile' },
  ];

  const navItems = role === 'customer' ? customerNavItems : technicianNavItems;
  const walletPath = `/${role}/wallet`;
  const notificationsPath = `/${role}/notifications`;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {/* Desktop & Tablet Header */}
      <header className="hidden md:block sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(navItems[0].path)}>
              <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-2 rounded-xl">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">FN</span>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent">
                  FIXIT NOW
                </h1>
                <p className="text-xs text-gray-600">Plumbing & Electrical Services</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#136dec] text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(notificationsPath)}
                className="p-2 hover:bg-gray-100 rounded-xl transition relative"
                title="Notifications"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2" onClick={() => navigate(navItems[0].path)}>
            <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-1.5 rounded-lg">
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-white font-bold">FN</span>
              </div>
            </div>
            <div>
              <h1 className="font-bold bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent">
                FIXIT NOW
              </h1>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(notificationsPath)}
              className="p-2 hover:bg-gray-100 rounded-lg transition relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-2 space-y-1">
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
