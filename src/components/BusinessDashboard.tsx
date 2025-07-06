import React, { useState } from 'react';
import { Star, MessageCircle, RefreshCw, Calendar, TrendingUp, Award } from 'lucide-react';
import { BusinessData } from '../types/business';
import { businessApi } from '../services/api';

interface BusinessDashboardProps {
  businessData: BusinessData;
  onHeadlineUpdate: (newHeadline: string) => void;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ 
  businessData, 
  onHeadlineUpdate 
}) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegenerateHeadline = async () => {
    setIsRegenerating(true);
    setError(null);

    try {
      const response = await businessApi.regenerateHeadline(
        businessData.name,
        businessData.location
      );
      onHeadlineUpdate(response.headline);
    } catch (err) {
      setError('Failed to regenerate headline. Please try again.');
      console.error('Error regenerating headline:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : i < rating 
            ? 'text-yellow-400 fill-yellow-400 opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {businessData.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {businessData.location}
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            Dashboard Active
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google Rating Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Google Rating</h3>
            <Award className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-gray-900">
              {businessData.rating.toFixed(1)}
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(businessData.rating)}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Based on Google Business Profile
          </p>
        </div>

        {/* Reviews Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
            <MessageCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-gray-900">
              {businessData.reviews.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              reviews
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Total customer feedback
          </p>
        </div>
      </div>

      {/* SEO Headline Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            AI-Generated SEO Headline
          </h3>
          <button
            onClick={handleRegenerateHeadline}
            disabled={isRegenerating}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Generating...' : 'Regenerate'}</span>
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-4">
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Current Headline:
          </h4>
          <p className="text-xl text-gray-800 leading-relaxed">
            "{businessData.headline}"
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {formatDate(businessData.timestamp)}</span>
        </div>
      </div>

      {/* Insights Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Business Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Rating Quality</h4>
            <p className="text-sm text-blue-700">
              {businessData.rating >= 4.5 ? 'Excellent' : businessData.rating >= 4.0 ? 'Very Good' : 'Good'} customer satisfaction
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Review Volume</h4>
            <p className="text-sm text-green-700">
              {businessData.reviews >= 200 ? 'High' : businessData.reviews >= 100 ? 'Moderate' : 'Growing'} review activity
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">SEO Status</h4>
            <p className="text-sm text-purple-700">
              Optimized headline ready for content marketing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;