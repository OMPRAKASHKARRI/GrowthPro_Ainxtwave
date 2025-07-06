export interface BusinessData {
  rating: number;
  reviews: number;
  headline: string;
  name: string;
  location: string;
  timestamp: string;
}

export interface BusinessFormData {
  name: string;
  location: string;
}

export interface HeadlineResponse {
  headline: string;
  timestamp: string;
}