import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Award, Crown, Zap, Shield, Star, Clock, CheckCircle } from 'lucide-react';

export function MembershipScreen() {
  const navigate = useNavigate();

  const benefits = [
    { icon: Zap, title: 'Priority Booking', description: 'Get first access to top technicians' },
    { icon: Star, title: '20% Discount', description: 'Save on all services year-round' },
    { icon: Shield, title: 'Extended Warranty', description: '90-day service guarantee' },
    { icon: Clock, title: '24/7 Support', description: 'Dedicated premium support line' },
  ];

  const plans = [
    {
      name: 'Monthly',
      price: 19.99,
      period: 'month',
      savings: null,
      popular: false,
    },
    {
      name: 'Annual',
      price: 149.99,
      period: 'year',
      savings: 'Save $90',
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Crown className="w-8 h-8 text-white" />
          <h1 className="text-white text-2xl font-bold">Premium Membership</h1>
        </div>
        <p className="text-white/90">Unlock exclusive benefits</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Benefits */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Premium Benefits</h2>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <benefit.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Choose Your Plan</h2>
          <div className="space-y-3">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className={`bg-white rounded-2xl p-5 shadow-md relative ${
                  plan.popular ? 'border-2 border-amber-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                    {plan.savings && (
                      <p className="text-sm text-green-600 font-semibold">{plan.savings}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Subscribe Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-md"
        >
          <h3 className="font-bold text-gray-900 mb-4">What's Included</h3>
          <div className="space-y-3">
            {[
              'Unlimited service bookings',
              '20% discount on all services',
              'Priority technician assignment',
              'Free service calls',
              'Extended 90-day warranty',
              '24/7 premium support',
              'Early access to new features',
              'Exclusive member rewards',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Terms */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-sm text-gray-600"
        >
          <p>Cancel anytime. No hidden fees.</p>
          <p className="mt-1">Auto-renews unless cancelled before renewal date.</p>
        </motion.div>
      </div>
    </div>
  );
}
