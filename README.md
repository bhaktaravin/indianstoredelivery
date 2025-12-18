# Local Bazaar - Expo Mobile & Web App

A modern, responsive Expo application helping small Indian businesses increase foot traffic and manage mobile orders.

## Features

### Customer-Facing
- Browse nearby businesses with location and ratings
- View detailed business profiles with photos and contact info
- Simple mobile ordering with cart management
- Multiple pickup time options
- Offers and discounts display
- QR code scanning for quick store access
- WhatsApp and phone integration

### Business Owner Dashboard
- Analytics dashboard with key metrics
- Order management (pending, ready, completed)
- Product/menu management
- Business profile editor
- QR code generation for foot traffic
- Customer engagement insights

## Tech Stack

- **Framework**: Expo (React Native + Expo Web)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind for React Native)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on different platforms:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
.
├── app/                    # App screens (file-based routing)
│   ├── index.tsx          # Landing page
│   ├── businesses.tsx     # Business listing
│   ├── business/[id].tsx  # Business detail
│   ├── cart.tsx           # Shopping cart
│   ├── orders.tsx         # Order management
│   ├── dashboard.tsx      # Business dashboard
│   ├── products.tsx       # Product management
│   ├── qr-code.tsx        # QR code generator
│   ├── scanner.tsx        # QR code scanner
│   └── profile.tsx        # User profile
├── components/            # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── BusinessCard.tsx
│   ├── ProductCard.tsx
│   ├── OrderCard.tsx
│   └── EmptyState.tsx
├── store/                 # State management
│   └── index.ts          # Zustand store
└── global.css            # Global styles

```

## Design Philosophy

- **Low-tech friendly**: Large buttons, minimal text, clear CTAs
- **Fast performance**: Optimized for low-end devices
- **Indian market aesthetics**: Warm colors (orange, amber, green)
- **Offline-ready structure**: Works on low bandwidth
- **Language-ready**: English first, expandable to Hindi/regional languages

## Key Features Implementation

### State Management
Uses Zustand for lightweight state management with mock data for businesses, products, orders, and user state.

### Navigation
Expo Router provides file-based routing that works seamlessly across mobile and web.

### Styling
NativeWind brings Tailwind CSS utility classes to React Native, ensuring consistent styling across platforms.

### Color Palette
- Primary: Orange/Amber (#FF8C42)
- Secondary: Green (#4A8F4C)
- Accent: Yellow (#FFD96B)
- Neutral: Warm grays

## Deployment

### Web (Vercel)
```bash
npm run build
# Deploy the output to Vercel
```

### Mobile (Expo Build)
```bash
# iOS
expo build:ios

# Android
expo build:android
```

## Future Enhancements

- Real backend API integration
- UPI payment integration
- Google Maps/Mapbox for location
- Push notifications with Expo Notifications
- Multi-language support (Hindi, Tamil, etc.)
- Real QR code scanning with expo-camera
- Image uploads for products
- Analytics integration

## Contributing

This is a demo project showcasing Expo cross-platform development for small business management in the Indian market.

## License

MIT
# indianstoredelivery
