import React, { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import BusinessDashboard from './components/BusinessDashboard';
import { BusinessData, BusinessFormData } from './types/business';
import { businessApi } from './services/api';
import { Sparkles, ArrowLeft } from 'lucide-react';

function App() {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: BusinessFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await businessApi.submitBusinessData(formData);
      setBusinessData(data);
    } catch (err) {
      setError('Failed to fetch business data. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeadlineUpdate = (newHeadline: string) => {
    if (businessData) {
      setBusinessData({
        ...businessData,
        headline: newHeadline,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleReset = () => {
    setBusinessData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GrowthProAI</h1>
                  <p className="text-sm text-gray-600">Business Dashboard</p>
                </div>
              </div>
              
              {businessData && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>New Search</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {!businessData ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
              <BusinessForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <div className="space-y-8">
              <BusinessDashboard 
                businessData={businessData} 
                onHeadlineUpdate={handleHeadlineUpdate}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                © 2025 GrowthProAI Business Dashboard. Built with React, TypeScript, and Tailwind CSS.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                This is a demonstration project simulating SEO content and Google Business data.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;