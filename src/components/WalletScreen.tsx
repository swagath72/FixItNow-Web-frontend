import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Wallet, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';

export function WalletScreen() {
  const navigate = useNavigate();
  const [balance] = useState(250.00);
  const [transactions] = useState([
    { id: 1, type: 'debit', amount: 80, description: 'AC Installation Payment', date: '2026-02-10' },
    { id: 2, type: 'credit', amount: 50, description: 'Wallet Top-up', date: '2026-02-08' },
    { id: 3, type: 'debit', amount: 120, description: 'Plumbing Service', date: '2026-02-05' },
    { id: 4, type: 'credit', amount: 100, description: 'Referral Bonus', date: '2026-02-01' },
    { id: 5, type: 'debit', amount: 60, description: 'Electrical Repair', date: '2026-01-28' },
  ]);

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
        <h1 className="text-white text-2xl font-bold">FIXIT Wallet</h1>
        <p className="text-white/90">Your digital wallet</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {/* Balance Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-6 h-6" />
            <p className="text-white/90">Available Balance</p>
          </div>
          <h2 className="text-5xl font-bold mb-6">${balance.toFixed(2)}</h2>
          <button className="w-full bg-white text-green-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition">
            <Plus className="w-5 h-5" />
            Add Money
          </button>
        </motion.div>

        {/* Transaction History */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className={`w-5 h-5 ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    ) : (
                      <ArrowUpRight className={`w-5 h-5 ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-bold text-lg ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
