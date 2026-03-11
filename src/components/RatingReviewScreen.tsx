import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

export function RatingReviewScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { completeBooking } = useBooking();

  const handleSubmit = () => {
    setSubmitted(true);
    completeBooking();
    setTimeout(() => {
      navigate('/customer/home');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your feedback has been submitted</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rate Your Experience</h1>
        <p className="text-gray-600">Help us improve our service</p>
      </div>


      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {/* Technician Info */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
              alt="Technician"
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
            <h3 className="font-bold text-gray-900">Mike Johnson</h3>
            <p className="text-gray-600 text-sm">Electrician</p>
          </div>

          {/* Star Rating */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-center">Rate the service</h3>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${star <= (hoveredRating || rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                      }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-4 font-medium text-gray-700"
              >
                {rating === 5 && 'Excellent! ⭐'}
                {rating === 4 && 'Great! 👍'}
                {rating === 3 && 'Good 👌'}
                {rating === 2 && 'Okay 😐'}
                {rating === 1 && 'Needs Improvement 😞'}
              </motion.p>
            )}
          </div>

          {/* Review Text */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-4">Write a review</h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with us..."
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
        </motion.div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white p-6 shadow-lg border-t z-10 transition-all">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}