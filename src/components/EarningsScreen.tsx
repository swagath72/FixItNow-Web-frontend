import { useState } from 'react';

import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

export function EarningsScreen() {

  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const earnings = {
    today: 250,
    week: 1420,
    month: 5680,
  };

  const completedJobs = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      service: 'Switch Repair',
      date: 'Feb 12, 2026',
      amount: '$50',
    },
    {
      id: 2,
      customer: 'Michael Chen',
      service: 'Light Installation',
      date: 'Feb 12, 2026',
      amount: '$75',
    },
    {
      id: 3,
      customer: 'Emily Davis',
      service: 'Wiring Issue',
      date: 'Feb 11, 2026',
      amount: '$100',
    },
    {
      id: 4,
      customer: 'Robert Smith',
      service: 'Fan Installation',
      date: 'Feb 10, 2026',
      amount: '$60',
    },
  ];

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  return (
    <div className="pb-8">
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Earnings</h1>
            <p className="text-gray-600">Track your income and performance</p>
          </div>

          {/* Period Selector */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl w-full md:w-auto">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`flex-1 md:px-6 py-2.5 rounded-xl font-semibold transition-all ${selectedPeriod === period.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Total Earnings Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 shadow-lg shadow-green-500/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-white" />
            <span className="text-white/90 font-bold uppercase tracking-wider text-sm">Total Earnings</span>
          </div>
          <p className="text-5xl font-black text-white mb-2">
            ${earnings[selectedPeriod as keyof typeof earnings]}
          </p>
          <div className="flex items-center gap-2 text-white/90">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+12% from last period</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600 text-sm">Jobs Done</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600 text-sm">Avg/Job</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">$71</p>
            </div>
          </div>
        </div>

        {/* Completed Jobs List */}
        <div className="mt-8">
          <h2 className="font-bold text-gray-900 mb-4 text-xl">Completed Jobs</h2>
          <div className="space-y-3">
            {completedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{job.customer}</h3>
                  <span className="text-xl font-bold text-green-600">{job.amount}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                  <span>{job.service}</span>
                  <span>{job.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
