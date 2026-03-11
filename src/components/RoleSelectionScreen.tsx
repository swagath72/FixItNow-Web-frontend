import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { User, Wrench, Zap, CheckCircle } from 'lucide-react';

export function RoleSelectionScreen() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'Book trusted home service professionals',
      icon: User,
      path: '/location-selection',
      gradient: 'from-[#136dec] to-cyan-500',
      features: ['Book instantly', 'Track in real-time', 'Secure payments'],
    },
    {
      id: 'technician',
      title: 'Technician',
      description: 'Earn by providing quality home services',
      icon: Wrench,
      path: '/technician/register',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Flexible schedule', 'Good earnings', 'Get more clients'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Branding (Desktop) */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#136dec] to-purple-600 p-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 mb-8">
              <Zap className="w-24 h-24 text-white mx-auto mb-4" fill="white" />
              <h1 className="text-6xl font-bold text-white mb-4">FIXIT NOW</h1>
              <p className="text-2xl text-white/90">
                Plumbing & Electrical Services
              </p>
            </div>
            <p className="text-xl text-white/80 max-w-md">
              Join thousands of happy customers and skilled technicians on our platform
            </p>
          </motion.div>
        </div>

        {/* Right Side - Role Selection */}
        <div className="flex flex-col justify-center items-center p-6 lg:p-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-[#136dec] to-orange-500 p-3 rounded-2xl shadow-lg">
                  <Zap className="w-10 h-10 text-white" fill="white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#136dec] to-orange-500 bg-clip-text text-transparent mb-2">
                FIXIT NOW
              </h1>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3">
                Choose Your Role
              </h2>
              <p className="text-gray-600 text-lg">
                Select how you'd like to use FIXIT NOW
              </p>
            </div>

            <div className="space-y-6">
              {roles.map((role, index) => (
                <motion.button
                  key={role.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  onClick={() => navigate(role.path)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all text-left group"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                    >
                      <role.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                        {role.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{role.description}</p>
                      <div className="space-y-2">
                        {role.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
