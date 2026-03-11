import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Plus, Trash2, CheckCircle } from 'lucide-react';

export function PaymentMethodsScreen() {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      cardNumber: '**** **** **** 4532',
      cardHolder: 'John Smith',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'card',
      cardNumber: '**** **** **** 8901',
      cardHolder: 'John Smith',
      expiry: '08/26',
      isDefault: false,
    },
  ]);

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
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
        <h1 className="text-white text-2xl font-bold">Payment Methods</h1>
        <p className="text-white/90">Manage your cards & wallets</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {/* Add New Payment Method */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => {}}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add New Card
        </motion.button>

        {/* Payment Methods List */}
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-5 shadow-md relative"
          >
            {method.isDefault && (
              <div className="absolute top-3 right-3 bg-green-100 px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Default
                </span>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">{method.cardNumber}</p>
                <p className="text-sm text-gray-600 mt-1">{method.cardHolder}</p>
                <p className="text-sm text-gray-500 mt-1">Expires {method.expiry}</p>

                <div className="flex gap-2 mt-4">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-200 transition"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
