# Mini Local Business Dashboard

A beautiful, production-ready dashboard that simulates how small businesses can view their SEO content and Google Business data. Built for GrowthProAI as a demonstration of modern full-stack development.

## 🚀 Features

- **Responsive Business Dashboard** - Clean, modern interface that works on all devices
- **Real-time Business Data Simulation** - Google ratings, reviews, and SEO insights
- **AI-Style SEO Headline Generation** - Dynamic headline creation and regeneration
- **Form Validation & Loading States** - Smooth user experience with proper feedback
- **Production-Ready Design** - Professional aesthetics with glassmorphism effects

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

**Backend:**
- Node.js with Express
- CORS enabled for cross-origin requests
- RESTful API design
- Simulated data with realistic business metrics

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd business-dashboard-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```
   
   This will start both the frontend (port 5173) and backend (port 3001) servers concurrently.

4. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🔧 API Endpoints

### POST /business-data
Submit business information and receive simulated Google Business data.

**Request:**
```json
{
  "name": "Cake & Co",
  "location": "Mumbai"
}
```

**Response:**
```json
{
  "rating": 4.3,
  "reviews": 127,
  "headline": "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
  "name": "Cake & Co",
  "location": "Mumbai",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

### GET /regenerate-headline
Generate a new SEO headline for an existing business.

**Request:**
```
GET /regenerate-headline?name=Cake%20%26%20Co&location=Mumbai
```

**Response:**
```json
{
  "headline": "Discover Why Cake & Co is Revolutionizing Mumbai's Local Scene",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

## 🎨 Design Features

- **Glassmorphism UI** - Modern translucent cards with backdrop blur
- **Gradient Accents** - Blue to purple gradients for visual appeal
- **Responsive Grid Layout** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Loading states and hover effects
- **Professional Typography** - Clear hierarchy and readable fonts

## 🔄 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run client` - Start only the frontend development server
- `npm run server` - Start only the backend server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build locally

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🎯 Key Components

### BusinessForm
- Input validation with real-time feedback
- Loading states during API calls
- Clean, accessible form design

### BusinessDashboard
- Google rating with star display
- Review count with formatting
- SEO headline with regeneration capability
- Business insights and recommendations

### API Service
- Centralized API calls with error handling
- Type-safe interfaces
- Proper error boundaries

## 🚀 Deployment Options

**Frontend (Recommended: Netlify/Vercel):**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

**Backend (Recommended: Render/Railway):**
1. Push to Git repository
2. Connect to deployment platform
3. Set start command: `node server.js`

## 🔐 Environment Variables

No environment variables are required for the basic setup. All configurations use sensible defaults for development.

## 🤝 Contributing

This project follows modern React and Node.js best practices:
- TypeScript for type safety
- Component-based architecture
- Separation of concerns
- Error handling and validation
- Responsive design principles

Email your submission to: [omvaradhan@gmail.com]
Subject: Submission – Full Stack Intern Assignment – [OM PRAKASH KARRI]
