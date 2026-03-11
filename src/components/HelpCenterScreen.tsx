import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronRight, Search } from 'lucide-react';

export function HelpCenterScreen() {
  const navigate = useNavigate();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      question: 'How do I book a service?',
      answer: 'Select the service type (Electrical or Plumbing) from the home screen, choose the specific service you need, enter booking details, and select a technician. You can track the technician in real-time once the booking is confirmed.',
    },
    {
      id: 2,
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, FIXIT Wallet, UPI, and cash payments. You can manage your payment methods in the Profile > Payment Methods section.',
    },
    {
      id: 3,
      question: 'How can I cancel or reschedule a booking?',
      answer: 'Go to Service History, select the booking, and tap Cancel or Reschedule. Cancellations made more than 2 hours before the scheduled time are eligible for a full refund.',
    },
    {
      id: 4,
      question: 'How do I track my technician?',
      answer: 'Once your booking is confirmed, you will see a live tracking screen showing the technician\'s location and estimated arrival time.',
    },
    {
      id: 5,
      question: 'What is FIXIT Wallet?',
      answer: 'FIXIT Wallet is your digital wallet where you can store money for quick payments. You can add money to your wallet and use it for booking services. You also earn cashback and rewards in your wallet.',
    },
    {
      id: 6,
      question: 'How do referrals work?',
      answer: 'Share your unique referral code with friends. When they sign up and complete their first service, you earn $200 and they get $20 off their first service!',
    },
    {
      id: 7,
      question: 'Are technicians verified?',
      answer: 'Yes! All technicians go through a strict verification process including background checks, document verification, and skill assessments before they can accept jobs.',
    },
    {
      id: 8,
      question: 'What if I\'m not satisfied with the service?',
      answer: 'You can rate and review the technician after service completion. If you\'re unsatisfied, contact our support team within 24 hours for resolution or refund.',
    },
  ];

  const categories = [
    { title: 'Getting Started', icon: '🚀', count: 12 },
    { title: 'Payments & Billing', icon: '💳', count: 8 },
    { title: 'Booking & Scheduling', icon: '📅', count: 15 },
    { title: 'Technician Info', icon: '👨‍🔧', count: 10 },
    { title: 'Safety & Security', icon: '🔒', count: 6 },
    { title: 'Account Settings', icon: '⚙️', count: 9 },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-12">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Help Center</h1>
        <p className="text-gray-600">FAQs & support</p>
      </div>


      <div className="max-w-4xl mx-auto px-6 mt-6 space-y-6">
        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-md border-2 border-transparent focus:border-blue-500 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition text-left"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{category.title}</p>
                <p className="text-xs text-gray-500">{category.count} articles</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="font-semibold text-gray-900">{faq.question}</p>
                  </div>
                  {expandedFaq === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-4 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center"
        >
          <h3 className="font-bold text-lg mb-2">Still Need Help?</h3>
          <p className="text-white/90 mb-4">Our support team is here 24/7</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}
