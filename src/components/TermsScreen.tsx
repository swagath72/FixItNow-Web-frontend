import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, ChevronRight } from 'lucide-react';

export function TermsScreen() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Terms of Service',
      description: 'User agreement and service terms',
      updated: '2026-01-01',
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect and use your data',
      updated: '2026-01-01',
    },
    {
      title: 'Refund Policy',
      description: 'Cancellations and refund guidelines',
      updated: '2025-12-15',
    },
    {
      title: 'Service Guarantee',
      description: 'Our commitment to quality service',
      updated: '2025-12-01',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold">Terms & Conditions</h1>
        <p className="text-white/90">Legal information</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {sections.map((section, index) => (
          <motion.button
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{section.title}</p>
                <p className="text-sm text-gray-500">{section.description}</p>
                <p className="text-xs text-gray-400 mt-1">Updated: {section.updated}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.button>
        ))}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md mt-6"
        >
          <h3 className="font-bold text-gray-900 mb-3">Quick Summary</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>• You must be 18+ years old to use FIXIT NOW services</p>
            <p>• All bookings are subject to technician availability</p>
            <p>• Cancellations made 2+ hours before scheduled time receive full refund</p>
            <p>• We protect your personal information and never share it with third parties</p>
            <p>• Services come with quality guarantee and support</p>
            <p>• Technicians are independent contractors verified by FIXIT NOW</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-sm text-gray-600 py-4"
        >
          <p>By using FIXIT NOW, you agree to our Terms & Conditions</p>
          <p className="mt-2">
            Questions? <span className="text-blue-600 font-semibold">Contact Support</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
