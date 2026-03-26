import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Bot } from 'lucide-react';
import API from '../api';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  time: string;
}

interface ApiMessage {
  id: number;
  sender_email: string;
  receiver_email: string;
  message: string;
  timestamp: string;
  is_sent_by_me: boolean;
  status: string;
}

function formatMsgTime(raw: string): string {
  if (!raw) return '';
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } catch {
    return raw;
  }
}


const fetchGroqResponse = async (userMessage: string, chatHistory: Message[]) => {
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful Customer Support AI Assistant for "FIXIT NOW", a home service application. Help users with booking electricians, plumbers, painters, and other home services. Be polite, concise, and helpful. If asked about pricing, mention it starts from ₹149. Payment methods include UPI, Cards, and Cash.'
      },
      ...chatHistory.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      })),
      { role: 'user', content: userMessage }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',


        messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API Error Detail:', errorData);
      throw new Error(errorData.error?.message || `AI service error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "I'm having trouble connecting right now. How else can I help?";
  } catch (error: any) {
    console.error('Groq Error:', error);
    return `Technical error: ${error.message || 'Please try again later.'}`;
  }
};



export function ChatScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contactId } = useParams();

  const contactEmail = contactId === 'support' ? 'support' : decodeURIComponent(contactId || '');
  const isAISupport = contactEmail === 'support';

  const contact = location.state?.contact;
  const contactName = contact?.name || contactEmail;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    if (isAISupport) {
      return [
        {
          id: 1,
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: 'other',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        },
      ];
    }
    return [];
  });
  const [loading, setLoading] = useState(!isAISupport);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const apiToLocal = useCallback((apiMsgs: ApiMessage[]): Message[] => {
    return apiMsgs.map((m) => ({
      id: m.id,
      text: m.message,
      sender: m.is_sent_by_me ? 'user' : 'other',
      time: formatMsgTime(m.timestamp),
    }));
  }, []);

  const fetchMessages = useCallback(async (silent = false) => {
    if (isAISupport || !contactEmail) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await API.get(`/chat/messages/${encodeURIComponent(contactEmail)}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const fetched: ApiMessage[] = res.data.messages || [];
      setMessages(apiToLocal(fetched));
    } catch (err: any) {
      if (err?.response?.status === 401 && !silent) {
        console.error('Chat authentication failed');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [isAISupport, contactEmail, apiToLocal]);

  useEffect(() => {
    if (isAISupport) return;
    fetchMessages(false);
  }, [fetchMessages, isAISupport]);

  useEffect(() => {
    if (isAISupport) return;
    pollingRef.current = setInterval(() => {
      fetchMessages(true);
    }, 3000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [fetchMessages, isAISupport]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const text = message.trim();
    setMessage('');

    if (isAISupport) {
      const userMsg: Message = {
        id: Date.now(),
        text,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };

      // Update local state immediately
      setMessages((prev) => [...prev, userMsg]);

      try {
        setSending(true);
        // Pass current messages (before the state update finishes)
        const aiText = await fetchGroqResponse(text, messages);
        const aiReply: Message = {
          id: Date.now() + 1,
          text: aiText,
          sender: 'other',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiReply]);
      } catch (error) {
        console.error('AI Support Error:', error);
      } finally {
        setSending(false);
      }
      return;
    }



    const optimistic: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      setSending(true);
      const token = localStorage.getItem('token');
      await API.post('/chat/send', {
        receiver_email: contactEmail,
        message: text
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      });
      fetchMessages(true);
    } catch {
      const errMsg: Message = {
        id: Date.now() + 2,
        text: '⚠️ Failed to send message. Please try again.',
        sender: 'other',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed top-[73px] bottom-0 left-0 lg:left-64 right-0 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col z-0">
      {/* Header (Stable within the fixed container) */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-3xl shadow-lg shrink-0 z-10 mx-4 mt-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/20 rounded-full transition lg:hidden"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          {isAISupport ? (
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center font-bold text-white text-lg overflow-hidden shrink-0">
              {contactName
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h1 className="text-white text-xl font-bold truncate">
              {isAISupport ? 'Customer Support' : contactName}
            </h1>
            <p className="text-white/90 text-sm opacity-80">
              {isAISupport ? 'AI Assistant' : contact?.role || (location.pathname.includes('technician') ? 'Customer' : 'Technician')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages (The only scrollable part) */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full flex flex-col pb-4">

          {loading ? (
            <div className="flex justify-center items-center h-full py-20">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Loading messages…</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center items-center h-full py-20">
              <p className="text-gray-400 text-sm">No messages yet. Say hi! 👋</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index < 10 ? index * 0.04 : 0, duration: 0.3 }}
                className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] lg:max-w-[70%] ${msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-200'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                    } rounded-2xl px-4 py-3 shadow-md`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 text-right font-medium ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section at the Bottom */}
      <div className="bg-white border-t border-gray-100 p-4 lg:p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] shrink-0 z-20">

        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !sending && handleSend()}
            placeholder="Type a message…"
            className="flex-1 px-5 py-3.5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-500/30 focus:bg-white focus:outline-none transition-all shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={sending || !message.trim()}
            className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 disabled:cursor-not-allowed"
          >
            {sending ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}