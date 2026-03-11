import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ChevronRight, Bot, MessageCircle, Loader2, RefreshCw } from 'lucide-react';
import API from '../api';

interface ChatContact {
  name: string;
  email: string;
  last_message: string;
  time: string;
  unread_count: number;
  role: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatTime(raw: string): string {
  if (!raw) return '';
  try {
    const date = new Date(raw);
    if (isNaN(date.getTime())) return raw;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  } catch {
    return raw;
  }
}

export function TechnicianChatList() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Session expired. Please log in again.");
        setLoading(false);
        return;
      }
      const res = await API.get('/chat/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setContacts(res.data);
    } catch (err: any) {
      const status = err?.response?.status;
      const detail = err?.response?.data?.detail;
      console.error('[TechnicianChatList] fetch error:', status, detail, err?.message);
      setError(`Failed to load conversations (${status || 'Network Error'}): ${detail || ''}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 lg:rounded-2xl lg:m-6 lg:shadow-xl shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Messages</h1>
          <p className="text-white/90">Chat with customers</p>
        </div>
        <button
          onClick={() =>
            navigate('/technician/chat/support', {
              state: { contact: { id: 'support', name: 'AI Support', role: 'AI Assistant', image: '' } },
            })
          }
          className="bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-full transition flex items-center justify-center shadow-md gap-2"
        >
          <Bot className="w-5 h-5 text-white" />
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="text-white font-bold tracking-wide"
          >
            AI
          </motion.span>
        </button>
      </div>

      {/* Chat List */}
      <div className="px-6 mt-6 pb-6 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-gray-500">Loading conversations…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchContacts}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">No conversations yet</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Once you accept a job, you can chat with the customer here.
            </p>
          </div>
        ) : (
          contacts.map((contact, index) => (
            <motion.button
              key={contact.email}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() =>
                navigate(`/technician/chat/${encodeURIComponent(contact.email)}`, {
                  state: { contact: { ...contact, id: contact.email } },
                })
              }
              className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{getInitials(contact.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{formatTime(contact.time)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{contact.role}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.last_message}</p>
                </div>
                {contact.unread_count > 0 ? (
                  <div className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    {contact.unread_count}
                  </div>
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}
