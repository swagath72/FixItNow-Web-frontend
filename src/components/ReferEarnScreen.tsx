import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Copy, Share2, Gift, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ReferEarnScreen() {
  const navigate = useNavigate();
  const [referralCode] = useState('FIXIT2026JOHN');
  const [referrals] = useState([
    { name: 'Sarah Johnson', status: 'completed', earned: 200, date: '2026-02-08' },
    { name: 'Mike Davis', status: 'pending', earned: 0, date: '2026-02-10' },
    { name: 'Emily Wilson', status: 'completed', earned: 200, date: '2026-01-28' },
  ]);

  const totalEarned = referrals.reduce((sum, ref) => sum + ref.earned, 0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join FIXIT NOW',
        text: `Use my referral code ${referralCode} to get $20 off your first service!`,
        url: 'https://fixitnow.app',
      });
    } else {
      toast.info('Share feature not available');
    }
  };

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
        <h1 className="text-white text-2xl font-bold">Refer & Earn</h1>
        <p className="text-white/90">Invite friends, get rewards</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Earnings Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-6 h-6" />
            <p className="text-white/90">Total Earnings</p>
          </div>
          <h2 className="text-5xl font-bold mb-2">${totalEarned}</h2>
          <p className="text-white/80 text-sm">{referrals.filter(r => r.status === 'completed').length} successful referrals</p>
        </motion.div>

        {/* Referral Code */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-bold text-gray-900 mb-4">Your Referral Code</h3>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
            <p className="text-center font-mono font-bold text-2xl text-blue-600">{referralCode}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopyCode}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Copy className="w-5 h-5" />
              Copy Code
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-bold text-gray-900 mb-4">How it Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Share your code</p>
                <p className="text-sm text-gray-600">Send your referral code to friends and family</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-600">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">They sign up</p>
                <p className="text-sm text-gray-600">Your friend signs up and books their first service</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-green-600">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">You both earn</p>
                <p className="text-sm text-gray-600">You get $200, they get $20 off their first service!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Referral History */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Your Referrals</h2>
          <div className="space-y-3">
            {referrals.map((referral, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{referral.name}</p>
                      <p className="text-sm text-gray-500">{referral.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {referral.status === 'completed' ? (
                      <>
                        <div className="flex items-center gap-1 text-green-600 font-bold">
                          <CheckCircle className="w-4 h-4" />
                          ${referral.earned}
                        </div>
                        <p className="text-xs text-gray-500">Completed</p>
                      </>
                    ) : (
                      <>
                        <p className="text-yellow-600 font-semibold">Pending</p>
                        <p className="text-xs text-gray-500">Awaiting first service</p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
