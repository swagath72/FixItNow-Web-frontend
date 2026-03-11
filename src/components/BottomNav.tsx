import { Home, Clock, MessageCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface BottomNavProps {
  role: 'customer' | 'technician';
}

export function BottomNav({ role }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const customerNavItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/customer/home' },
    { id: 'history', label: 'History', icon: Clock, path: '/customer/history' },
    { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/customer/chat-list' },
    { id: 'profile', label: 'Profile', icon: User, path: '/customer/profile' },
  ];

  const technicianNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/technician/dashboard' },
    { id: 'history', label: 'History', icon: Clock, path: '/technician/history' },
    { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/technician/chat-list' },
    { id: 'profile', label: 'Profile', icon: User, path: '/technician/profile' },
  ];

  const navItems = role === 'customer' ? customerNavItems : technicianNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all"
            >
              <item.icon
                className={`w-6 h-6 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}