import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Star, MapPin, Phone, MessageSquare } from 'lucide-react';

export function FavoritesScreen() {
  const navigate = useNavigate();

  const favorites = [
    {
      id: 1,
      name: 'Robert Wilson',
      specialty: 'Master Electrician',
      rating: 4.9,
      reviews: 234,
      jobsCompleted: 450,
      location: '2.5 km away',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Plumbing Expert',
      rating: 4.8,
      reviews: 189,
      jobsCompleted: 380,
      location: '3.1 km away',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'David Martinez',
      specialty: 'Electrical & AC Specialist',
      rating: 5.0,
      reviews: 156,
      jobsCompleted: 290,
      location: '1.8 km away',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
  ];

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
        <h1 className="text-white text-2xl font-bold">Favorite Technicians</h1>
        <p className="text-white/90">Your saved pros</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-md text-center"
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 text-lg mb-2">No Favorites Yet</h3>
            <p className="text-gray-600 mb-4">
              Add technicians to your favorites for quick access
            </p>
            <button
              onClick={() => navigate(-2)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Browse Technicians
            </button>
          </motion.div>
        ) : (
          favorites.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition"
            >
              <div className="flex gap-4">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900">{tech.name}</h3>
                    <button className="p-2 bg-red-50 rounded-lg hover:bg-red-100 transition">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{tech.specialty}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-sm">{tech.rating}</span>
                      <span className="text-xs text-gray-500">({tech.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{tech.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                      Book Now
                    </button>
                    <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                      <Phone className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                      <MessageSquare className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
