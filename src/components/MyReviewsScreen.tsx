import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Star, ThumbsUp, Calendar } from 'lucide-react';

export function MyReviewsScreen() {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      technicianName: 'Robert Wilson',
      technicianImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      service: 'AC Installation',
      rating: 5,
      review: 'Excellent service! Very professional and completed the work quickly. Highly recommend!',
      date: '2026-02-08',
      helpful: 12,
    },
    {
      id: 2,
      technicianName: 'Michael Chen',
      technicianImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      service: 'Pipe Repair',
      rating: 4,
      review: 'Good work, but took a bit longer than expected. Overall satisfied with the result.',
      date: '2026-01-28',
      helpful: 8,
    },
    {
      id: 3,
      technicianName: 'David Martinez',
      technicianImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      service: 'Electrical Wiring',
      rating: 5,
      review: 'Outstanding work! Very knowledgeable and explained everything clearly. Will definitely book again.',
      date: '2026-01-15',
      helpful: 15,
    },
  ];

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

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
        <h1 className="text-white text-2xl font-bold">My Reviews</h1>
        <p className="text-white/90">View all your ratings</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Stats Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-3xl font-bold text-gray-900">{averageRating}</span>
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{reviews.length}</p>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{reviews.reduce((sum, r) => sum + r.helpful, 0)}</p>
              <p className="text-sm text-gray-600">Helpful Votes</p>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Your Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex gap-3 mb-3">
                  <img
                    src={review.technicianImage}
                    alt={review.technicianName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{review.technicianName}</h3>
                    <p className="text-sm text-gray-600">{review.service}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{review.review}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} found this helpful</span>
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
