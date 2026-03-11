import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Gift, Tag, TrendingUp, Clock } from 'lucide-react';

export function RewardsScreen() {
  const navigate = useNavigate();

  const offers = [
    {
      id: 1,
      title: '20% Off First Service',
      description: 'Get 20% discount on your first electrical or plumbing service',
      code: 'FIRST20',
      validUntil: '2026-03-31',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Flat $50 Off',
      description: 'Save $50 on services above $200',
      code: 'SAVE50',
      validUntil: '2026-02-28',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      title: 'Free Installation',
      description: 'Get free installation on AC repair services',
      code: 'FREEAC',
      validUntil: '2026-04-15',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const rewardPoints = 1250;

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
        <h1 className="text-white text-2xl font-bold">Rewards & Offers</h1>
        <p className="text-white/90">Your special discounts</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Reward Points Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6" />
            <p className="text-white/90">Total Reward Points</p>
          </div>
          <h2 className="text-5xl font-bold mb-2">{rewardPoints}</h2>
          <p className="text-white/80 text-sm">Redeem points for exclusive rewards</p>
        </motion.div>

        {/* Available Offers */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Available Offers</h2>
          <div className="space-y-4">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md"
              >
                <div className={`bg-gradient-to-r ${offer.color} p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-6 h-6 text-white" />
                    <h3 className="text-white font-bold text-lg">{offer.title}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-700 mb-4">{offer.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="font-mono font-bold text-blue-600">{offer.code}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                      Copy Code
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-3 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to Earn */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-bold text-gray-900 text-lg mb-4">How to Earn Points</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <span className="text-green-600 font-bold">+100</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Complete a Service</p>
                <p className="text-sm text-gray-600">Earn 100 points per service</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <span className="text-blue-600 font-bold">+50</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Write a Review</p>
                <p className="text-sm text-gray-600">Get 50 points for each review</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <span className="text-purple-600 font-bold">+200</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Refer a Friend</p>
                <p className="text-sm text-gray-600">Get 200 points per referral</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
