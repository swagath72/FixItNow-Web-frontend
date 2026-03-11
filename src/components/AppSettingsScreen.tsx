import { useState } from 'react';

import { motion } from 'motion/react';
import { Download, Database, Moon, Vibrate } from 'lucide-react';

export function AppSettingsScreen() {


  const [settings, setSettings] = useState({
    darkMode: false,
    hapticFeedback: true,
    autoUpdate: true,
    dataSaver: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="pb-6">
      <div className="max-w-4xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">App Settings</h1>
        <p className="text-gray-600">Preferences & cache</p>
      </div>


      <div className="max-w-3xl mx-auto px-6 mt-6 space-y-6">
        {/* Appearance */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Appearance</h2>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Moon className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Enable dark theme</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('darkMode')}
              className={`w-12 h-6 rounded-full transition ${settings.darkMode ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>
        </div>

        {/* Performance */}
        <div>
          <h2 className="text-gray-700 font-bold text-lg mb-3 px-2">Performance</h2>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Auto-Update</p>
                <p className="text-sm text-gray-500">Download updates automatically</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('autoUpdate')}
              className={`w-12 h-6 rounded-full transition ${settings.autoUpdate ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.autoUpdate ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Data Saver</p>
                <p className="text-sm text-gray-500">Reduce data usage</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('dataSaver')}
              className={`w-12 h-6 rounded-full transition ${settings.dataSaver ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.dataSaver ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Vibrate className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Haptic Feedback</p>
                <p className="text-sm text-gray-500">Vibration on interactions</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('hapticFeedback')}
              className={`w-12 h-6 rounded-full transition ${settings.hapticFeedback ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settings.hapticFeedback ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
