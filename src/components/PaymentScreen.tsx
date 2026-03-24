import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Wallet, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import API from '../api';

export function PaymentScreen() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const { ongoingBooking, updateBookingStatus, completeBooking } = useBooking();
  const [billDetails, setBillDetails] = useState({
    serviceCharge: 0,
    materialCost: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    const fetchBill = async () => {
      if (!ongoingBooking?.id) return;
      try {
        const res = await API.get(`/booking/${ongoingBooking.id}`);
        const costStr = res.data.cost || '₹0';
        const costVal = parseInt(costStr.replace('₹', '').replace(',', '')) || 500;

        // Split for display
        const serviceCharge = Math.floor(costVal * 0.8);
        const materialCost = Math.floor(costVal * 0.1);
        const tax = costVal - serviceCharge - materialCost;

        setBillDetails({
          serviceCharge,
          materialCost,
          tax,
          total: costVal
        });
      } catch (err) {
        console.error('Error fetching bill:', err);
      }
    };
    fetchBill();
  }, [ongoingBooking?.id]);

  useEffect(() => {
    if (!ongoingBooking) {
      navigate('/customer/home');
    }
  }, [ongoingBooking, navigate]);

  const handleRazorpayPayment = () => {
    if (!ongoingBooking) return;

    setIsProcessing(true);

    const options = {
      key: "rzp_test_SN5q4r9UbjjvQv",
      amount: billDetails.total * 100, // Amount in paise
      currency: "INR",
      name: "FIXIT NOW",
      description: `Payment for ${ongoingBooking.serviceName}`,
      image: "/src/assets/logo.png",
      handler: async function (response: any) {
        console.log("Razorpay Success:", response);
        try {
          // Update status in backend (using numeric ID)
          await API.post('/technician/update-job-status', {
            booking_id: parseInt(ongoingBooking.id),
            status: 'Completed'
          });
          // Also mark as paid in the payment_status column using existing endpoint
          await API.post(`/mock-pay/${ongoingBooking.id}`);
        } catch (err) {
          console.error('Finalizing payment error:', err);
          // Still proceed to close the UI after successful payment
        } finally {
          updateBookingStatus('completed');
          completeBooking(); // Fully close the booking
          navigate('/customer/home');
          setIsProcessing(false);
        }
      },
      prefill: {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
      },
      theme: {
        color: "#136dec",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handlePayment = () => {
    if (selectedPayment === 'cash') {
      // Direct update for cash
      updateBookingStatus('completed');
      navigate('/customer/review');
    } else {
      handleRazorpayPayment();
    }
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI / Razorpay', icon: Wallet },
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
    { id: 'cash', name: 'Cash', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition lg:hidden"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold">Payment</h1>
        <p className="text-white/90">Complete your payment securely</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-32">
        {/* Price Breakdown */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="font-bold text-gray-900 mb-4">Bill Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Service Charge</span>
              <span>₹{billDetails.serviceCharge}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Material Cost</span>
              <span>₹{billDetails.materialCost}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax & Platform Fee</span>
              <span>₹{billDetails.tax}</span>
            </div>
            <div className="h-px bg-gray-200 my-3" />
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span className="text-blue-600">₹{billDetails.total}</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <div className="mt-6">
          <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <motion.button
                key={method.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 transition ${selectedPayment === method.id ? 'ring-2 ring-blue-600 border-transparent shadow-blue-100' : 'border-transparent'
                  }`}
              >
                <div className={`p-3 rounded-xl ${selectedPayment === method.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <span className="flex-1 text-left font-semibold text-gray-900">
                  {method.name}
                </span>
                {selectedPayment === method.id && (
                  <CheckCircle className="w-6 h-6 text-blue-600" fill="currentColor" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/80 backdrop-blur-md p-6 shadow-lg border-t z-10 transition-all">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              `Pay ₹${billDetails.total} Now`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}