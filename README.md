# InstaSpot - Travel Photo Sharing Platform

InstaSpot is a modern web application built with React that allows users to share and discover travel photos. It features a clean, Instagram-inspired interface with Material-UI components and responsive design.

## Features

- 📸 Photo sharing with captions
- 🖼️ Image preview modal
- ❤️ Like functionality for posts
- 👤 User profile management
- 🎨 Modern UI with Material-UI
- 📱 Responsive design for all devices
- 🔄 Real-time updates with React Query
- 🖼️ Integration with Unsplash API for travel images

## Tech Stack

- React 19
- Material-UI (MUI)
- React Aria
- TanStack Query (React Query)
- Vite
- Tailwind CSS
- Unsplash API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or pnpm

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd react-instaSpot
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `config.js` file in the root directory with your API keys:
```javascript
export const config = {
    UNSPLASH_API_KEY: 'your_unsplash_api_key',
    OPENTRIPMAP_API_KEY: 'your_opentripmap_api_key'
};
```

4. Start the development server:
```bash
npm run dev
# or
pnpm run dev
```

## Project Structure

```
src/
├── assets/
│   └── images/         # Static images and icons
├── components/
│   ├── cards.jsx      # Photo grid and post display
│   ├── footer.jsx     # Footer component
│   ├── navbar.jsx     # Navigation and logo
│   └── profile.jsx    # User profile and post creation
├── services/
│   └── api.jsx        # API integration
├── styles/
│   └── reset.css      # CSS reset
├── App.jsx            # Main application component
├── main.jsx          # Application entry point
└── index.css         # Global styles

```

## Key Features Implementation

### Photo Grid (Cards Component)
- Responsive grid layout using Material-UI
- Image preview modal
- Like functionality with local state
- Integration with Unsplash API
- Fallback to local images when API is unavailable

### Profile Management
- Profile picture upload
- Bio and name editing
- New post creation with image upload
- Form validation
- Responsive layout

### API Integration
- Unsplash API for travel images
- Rate limiting handling
- Error handling with fallback to local images
- React Query for data fetching and caching

## Styling

The project uses a combination of:
- Material-UI for component styling
- Tailwind CSS for utility classes
- Custom CSS for specific styling needs

The color scheme is based on a warm, travel-inspired palette:
- Background: #fcf5e5
- Text: #212121
- Accent colors from Material-UI theme

## Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build

### Code Style

The project follows modern React best practices:
- Functional components with hooks
- Proper prop typing
- Component composition
- Error boundaries
- Responsive design patterns

## Acknowledgments

- Unsplash for providing the image API
- Material-UI for the component library
- React Query for data fetching and caching
