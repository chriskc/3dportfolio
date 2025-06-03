# Architecture & Design 3D Portfolio

A professional portfolio website showcasing architecture, interior design, BIM management, and web development work. This portfolio is built with modern web technologies to create a visually impressive and highly functional online presence for architecture and design professionals.

## Features

- **3D Model Showcase**: Interactive 3D architectural models using React Three Fiber
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Project Gallery**: Filterable showcase of professional work
- **Firebase Integration**: Dynamic content management for projects
- **Dark/Light Mode**: Customizable appearance with theme support
- **Optimized Performance**: Fast loading and rendering for visual content

## Tech Stack

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite (for fast development and optimized builds)
- **3D Rendering**: React Three Fiber / Three.js
- **UI Components**: shadcn/ui (based on Radix UI)
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Data Management**: Firebase (Firestore + Storage)
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file based on `.env.example` and add your Firebase credentials
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
/src
  /3d              # 3D models and components
  /assets          # Static assets (images, icons)
  /components      # Reusable UI components
  /contexts        # React context providers
  /features        # Feature-specific components
  /hooks           # Custom React hooks
  /layouts         # Page layout components
  /lib             # Library configurations (Firebase, etc.)
  /pages           # Main page components
  /styles          # Global styles and theme configuration
  /types           # TypeScript type definitions
  /utils           # Utility functions
```

## Deployment

This project can be deployed to Vercel, Netlify, or GitHub Pages. For optimal performance and features, Vercel or Netlify are recommended.

### Deploy to Vercel

1. Push your code to a GitHub repository
2. Connect to Vercel and select the repository
3. Configure environment variables for Firebase
4. Deploy

## Customization

### Theme Customization

Edit the theme variables in `src/styles/globals.css` to customize the color scheme and appearance.

### Content Management

Projects can be managed through Firebase Firestore. The structure for each project should include:

- Title
- Category
- Description
- Tags
- Year
- Images
- Content

## Learning Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vite Documentation](https://vitejs.dev/guide/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.