import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Droplet, Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import API from '../api';

export function TechnicianRegistrationScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    experience: '',
    selectedSkills: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const skills = [
    { id: 'electrician', name: 'Electrician', icon: Zap },
    { id: 'plumber', name: 'Plumber', icon: Droplet },
  ];

  const toggleSkill = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skillId)
        ? prev.selectedSkills.filter((s) => s !== skillId)
        : [...prev.selectedSkills, skillId],
    }));
  };

  const handleContinue = async () => {
    if (formData.selectedSkills.length === 0 || !formData.experience) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await API.post('/technician/register', {
        skills: formData.selectedSkills,
        experience_years: Number(formData.experience),
        service_type: formData.selectedSkills[0],
      });
      navigate('/technician/documents');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string } } };
      setError(axiosErr?.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/role-selection')}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold">Technician Registration</h1>
        <p className="text-white/90">Join our network of professionals</p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 mt-6 pb-24"
      >
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          {/* Experience */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Years of Experience
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 5"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <label className="text-gray-700 font-medium mb-3 block">Select Your Skills</label>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`p-4 rounded-xl border-2 transition ${formData.selectedSkills.includes(skill.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                    }`}
                >
                  <skill.icon
                    className={`w-8 h-8 mx-auto mb-2 ${formData.selectedSkills.includes(skill.id)
                        ? 'text-blue-600'
                        : 'text-gray-600'
                      }`}
                  />
                  <span className="block text-sm font-medium text-gray-900">
                    {skill.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-lg border-t">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onClick={handleContinue}
          disabled={loading || formData.selectedSkills.length === 0 || !formData.experience}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}