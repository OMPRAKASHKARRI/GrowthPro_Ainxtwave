import { BusinessData, BusinessFormData, HeadlineResponse } from '../types/business';

// Update this URL with your deployed Render backend URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app-name.onrender.com'  // Replace with your actual Render URL
  : 'http://localhost:3001';

export const businessApi = {
  // Submit business data and get initial results
  submitBusinessData: async (formData: BusinessFormData): Promise<BusinessData> => {
    const response = await fetch(`${API_BASE_URL}/business-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error('Failed to fetch business data');
    }

    return response.json();
  },

  // Regenerate SEO headline
  regenerateHeadline: async (name: string, location: string): Promise<HeadlineResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error('Failed to regenerate headline');
    }

    return response.json();
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },
};