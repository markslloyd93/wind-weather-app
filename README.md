# Weather App

A modern, responsive weather application built with React, TypeScript, and Vite. Search for weather information by city, save favorite locations, and view detailed weather data with an intuitive user interface.

## Features

- 🔍 Search weather by city name
- ⭐ Save and manage favorite locations
- 🌡️ Detailed weather information (temperature, wind speed, wind degree & wind gust)
- 📱 Responsive design for all devices
- ♿ Accessibility-first approach
- ⚡ Fast performance with Vite
- 🧪 Comprehensive test coverage

## Setup and Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/markslloyd93/wind-weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests once
npm run test:run
```

## Architecture Overview

The application follows a modular architecture with clear separation of concerns:

```
src/
├── components/           # Reusable UI components
│   ├── WeatherSearch.tsx    # Search input component
│   ├── WeatherDisplay.tsx   # Weather data display
│   ├── FavoritesList.tsx    # Favorites management
│   ├── ErrorMessage.tsx     # Error handling UI
│   └── ErrorBoundary.tsx    # Error boundary wrapper
├── hooks/               # Custom React hooks
│   ├── useWeatherAPI.ts     # Weather API logic
│   └── useFavorites.ts      # Favorites management
├── test/               # Test utilities and setup
│   ├── setup.ts            # Test configuration
│   └── utils.tsx           # Test helpers
├── assets/             # Static assets (icons, images)
├── Weather.tsx         # Main component
└── Weather.css         # Styles
```

### Key Architectural Decisions

**Component Composition**: Small, focused components that make the codebase maintainable and scalable.

**Custom Hooks**: Business logic extracted into reusable hooks (`useWeatherAPI`, `useFavorites`) for better separation of concerns and testability.

**Error Boundaries**: Comprehensive error handling with React Error Boundaries to handle unexpected failures.

**State Management**: React's built-in state management with `useState` and `useCallback` for optimal performance.

**Accessibility First**: ARIA labels, semantic HTML, keyboard navigation, and screen reader support built-in from the start.

## Technology Choices and Justifications

### Core Technologies

**React 18 + TypeScript**
- **Why**: Popular and well used within the industry for building UIs with excellent TypeScript integration
- **Benefits**: Component reusability, strong typing, excellent developer experience

**Vite**
- **Why**: Fast build tool with excellent developer experience
- **Benefits**: optimized builds, great TypeScript support

### Development Tools

**Vitest + React Testing Library**
- **Why**: Native Vite integration, fast test execution, user-centric testing approach
- **Benefits**: Faster than Jest, better TypeScript support, focuses on user behavior

### API and Data

**Local Storage**
- **Why**: Simple persistence for favorites without backend complexity
- **Benefits**: Works offline, no server required, instant access

## Known Limitations and Assumptions

### Current Limitations

1. **API Rate Limits**
   - OpenWeatherMap free tier: 1,000 calls/day, 60 calls/minute
   - No rate limiting implemented in the app
   - Could hit limits with heavy usage

2. **Data Storage**
   - Favorites stored in localStorage (5-10MB limit)
   - Data lost if user clears browser data
   - No sync across devices

3. **Error Handling**
   - Basic error messages for API failures
   - No retry mechanism for failed requests
   - Network connectivity issues not specifically handled

4. **Browser Support**
   - Modern browsers only (ES2015+)
   - No Internet Explorer support
   - Assumes localStorage availability

5. **Geolocation**
   - No current location detection
   - Requires manual city entry
   - No GPS-based weather lookup

### Assumptions Made

- Users have stable internet connection
- Browser has localStorage enabled
- Users primarily use desktop/mobile browsers

## Future Improvement Suggestions

### Short-term

**Enhanced User Experience**
- [ ] Add geolocation support for current location weather
- [ ] Implement search suggestions/autocomplete
- [ ] Include more weather details (feels like, UV index, visibility)

**Technical Improvements**
- [ ] Add request caching to reduce API calls
- [ ] Implement retry logic for failed requests
- [ ] Add loading skeletons for better perceived performance
- [ ] Add toast notifications for user feedback

### Medium-term

**Feature Enhancements**
- [ ] Weather widgets/cards for dashboard view
- [ ] Weather alerts and notifications
- [ ] Multiple unit support (Imperial/Metric)
- [ ] Dark/light theme toggle

**Performance & Reliability**
- [ ] Service worker for offline capability
- [ ] Code optimization

### Long-term

**Advanced Features**
- [ ] User accounts and cloud sync
- [ ] Social sharing capabilities

**Architecture Evolution**
- [ ] Backend API for user data
- [ ] Move local storage solution to a DB
- [ ] PWA (Progressive Web App) capabilities
- [ ] Multi-language internationalization
- [ ] Advanced analytics and monitoring


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, TypeScript, and Vite**