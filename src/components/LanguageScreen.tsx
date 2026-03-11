import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Globe, Check } from 'lucide-react';

export function LanguageScreen() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
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
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-8 h-8 text-white" />
          <h1 className="text-white text-2xl font-bold">Language</h1>
        </div>
        <p className="text-white/90">Choose your preferred language</p>
      </div>

      <div className="px-6 mt-6 space-y-3">
        {languages.map((language, index) => (
          <motion.button
            key={language.code}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onClick={() => setSelectedLanguage(language.code)}
            className={`w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:shadow-lg transition ${
              selectedLanguage === language.code ? 'border-2 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{language.flag}</span>
              <p className="font-semibold text-gray-900">{language.name}</p>
            </div>
            {selectedLanguage === language.code && (
              <div className="bg-blue-100 p-2 rounded-full">
                <Check className="w-5 h-5 text-blue-600" />
              </div>
            )}
          </motion.button>
        ))}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-4"
        >
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition">
            Save Changes
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-blue-50 rounded-2xl p-4 text-center"
        >
          <p className="text-sm text-gray-700">
            The app will restart to apply the new language settings.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
