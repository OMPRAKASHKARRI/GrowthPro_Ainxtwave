import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.netlify.app', 'https://your-frontend-domain.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint (should be first)
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Business Dashboard API is running',
    timestamp: new Date().toISOString() 
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Sample headlines for different business types
const sampleHeadlines = [
  "Why {name} is {location}'s Best Kept Secret in 2025",
  "{name}: The {location} Destination Everyone's Talking About",
  "Discover Why {name} is Revolutionizing {location}'s Local Scene",
  "How {name} Became {location}'s Most Trusted Local Business",
  "{name}: Where {location} Residents Go for Excellence",
  "The Ultimate Guide to {name} - {location}'s Premier Choice",
  "Why {name} is Setting New Standards in {location}",
  "{name}: Your Go-To Destination in {location} for Quality Service"
];

// Helper function to generate random rating
const generateRating = () => {
  return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10; // 3.5-5.0 range
};

// Helper function to generate random review count
const generateReviews = () => {
  return Math.floor(Math.random() * 500) + 50; // 50-549 range
};

// Helper function to generate headline
const generateHeadline = (name, location) => {
  const template = sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)];
  return template.replace(/{name}/g, name).replace(/{location}/g, location);
};

// POST /business-data
app.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;
    
    if (!name || !location) {
      return res.status(400).json({ 
        error: 'Business name and location are required' 
      });
    }

    // Simulate processing delay
    setTimeout(() => {
      const businessData = {
        rating: generateRating(),
        reviews: generateReviews(),
        headline: generateHeadline(name, location),
        name,
        location,
        timestamp: new Date().toISOString()
      };

      res.json(businessData);
    }, 1000); // 1 second delay to show loading state

  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;
    
    if (!name || !location) {
      return res.status(400).json({ 
        error: 'Business name and location are required' 
      });
    }

    // Simulate processing delay
    setTimeout(() => {
      const newHeadline = generateHeadline(name, location);
      
      res.json({
        headline: newHeadline,
        timestamp: new Date().toISOString()
      });
    }, 800); // Slightly faster for regeneration

  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});