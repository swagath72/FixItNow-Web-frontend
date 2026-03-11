import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, FileText, Award, Image as ImageIcon, CheckCircle } from 'lucide-react';

export function DocumentUploadScreen() {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState({
    id: false,
    certificate: false,
    workPhoto: false,
  });

  const documents = [
    {
      id: 'id',
      name: 'Government ID',
      description: 'Upload your driving license or Aadhaar',
      icon: FileText,
    },
    {
      id: 'certificate',
      name: 'Skill Certificate',
      description: 'Upload your training certificate',
      icon: Award,
    },
    {
      id: 'workPhoto',
      name: 'Work Photos',
      description: 'Upload photos of your previous work',
      icon: ImageIcon,
    },
  ];

  const handleUpload = (docId: string) => {
    setUploads((prev) => ({ ...prev, [docId]: true }));
  };

  const handleSubmit = () => {
    if (!allUploaded) {
      alert('Please upload all required documents');
      return;
    }
    navigate('/technician/dashboard');
  };

  const allUploaded = Object.values(uploads).every((v) => v);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold">Document Verification</h1>
        <p className="text-white/90">Upload required documents</p>
      </div>

      {/* Documents */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 mt-6 pb-24"
      >
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                  <doc.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                  {uploads[doc.id as keyof typeof uploads] ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" fill="currentColor" />
                      <span className="font-medium">Uploaded</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpload(doc.id)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {allUploaded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-green-50 border-2 border-green-200 rounded-2xl p-4 text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 font-medium">All documents uploaded!</p>
            <p className="text-green-700 text-sm">Ready to submit for verification</p>
          </motion.div>
        )}
      </motion.div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-lg border-t">
        <button
          onClick={handleSubmit}
          disabled={!allUploaded}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
        >
          Submit for Verification
        </button>
      </div>
    </div>
  );
}