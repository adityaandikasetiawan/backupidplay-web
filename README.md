# IDPlay

## 🌟 Features

### 🏠 **Landing Page**
- **Hero Section** dengan interactive banner dan video background
- **Service Showcase** dengan animasi dan carousel
- **Product Catalog** dengan filter dan comparison
- **Coverage Maps** dengan Google Maps integration
- **Customer Testimonials** dan reviews
- **FAQ Section** yang comprehensive

### 📝 **Content Management**
- **Blog System** dengan kategori dan pencarian
- **News & Press Releases** dengan featured content
- **Dynamic Content** CMS
- **SEO Optimized** dengan static generation
- **Content Sharing** ke social media

### 🔐 **User Management**
- **Authentication System** (Login/Register/Reset Password)
- **User Dashboard** dengan service management
- **Profile Management** dan account settings
- **Task & Notes System** untuk customer support

### 🛒 **E-commerce Features**
- **Product Catalog** dengan berbagai paket internet
- **Regional Pricing** berdasarkan lokasi
- **Lead Generation** dengan form entri prospek
- **Coverage Check** by coordinate atau address

### 📱 **Responsive Design**
- **Mobile-first** approach
- **Touch-friendly** UI elements
- **Progressive Web App** ready
- **Cross-browser** compatibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0+
- npm 9.0.0+

### Installation
```bash
# Clone repository
git clone https://github.com/your-org/idplay.git
cd idplay

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables
```env
NEXT_PUBLIC_BASE_URL=https://domain.com
NEXT_PUBLIC_CMS_URL=https://cmsdomain.com
NEXT_PUBLIC_GOOGLE_API_KEY=your-google-api-key
```

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React, React Icons
- **Animations**: Framer Motion

### Backend Integration
- **CMS**: (Headless CMS)
- **API**: RESTful APIs
- **Authentication**: JWT Token
- **Maps**: Google Maps API, Leaflet
- **Forms**: React Hook Form + Zod

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Git Hooks**: Husky

## 📁 Project Structure

```
idplay/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 _components/       # Global components
│   ├── 📁 api/              # API routes
│   ├── 📁 article/          # Blog system
│   ├── 📁 news/             # News system
│   ├── 📁 dashboard/        # User dashboard
│   └── 📄 page.tsx          # Home page
├── 📁 components/ui/         # Reusable UI components
├── 📁 hooks/                # Custom React hooks
├── 📁 lib/                  # Utilities & services
│   ├── 📁 services/         # API services
│   └── 📁 validations/      # Form schemas
├── 📁 types/                # TypeScript definitions
├── 📁 public/               # Static assets
└── 📄 package.json          # Dependencies
```

## 🎨 Key Components

### Global Components (`app/_components/`)
- **Hero.tsx** - Interactive hero section dengan quiz
- **Navbar.tsx** - Responsive navigation dengan user profile
- **Footer.tsx** - Site footer dengan links
- **Product.tsx** - Product showcase dengan carousel
- **FAQ.tsx** - Frequently asked questions

### UI Components (`components/ui/`)
- **Button** - Customizable button component
- **Card** - Flexible card layouts
- **Form** - Form components dengan validation
- **Loading** - Loading states dan skeletons

### Custom Hooks (`hooks/`)
- **useAuth** - Authentication state management
- **useArticlesAPI** - Article fetching dengan pagination
- **useNewsAPI** - News fetching dengan search

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix linting issues
npm run type-check  # TypeScript type checking

# Testing
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

## 🔧 Configuration Files

- **`next.config.ts`** - Next.js configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`components.json`** - shadcn/ui configuration

## 🌐 API Integration

### Internal APIs (`/api/*`)
- `/api/auth/*` - Authentication endpoints
- `/api/check_coverage/*` - Coverage checking
- `/api/payment/*` - Payment processing
- `/api/subscription/*` - Subscription management

### External APIs
- **CMS** - Content management
- **Google Maps** - Location services
- **Main Backend** - Business logic APIs

## 📱 Pages Overview

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Homepage | Hero, Services, Products, FAQ |
| `/article` | Blog listing | Search, Categories, Pagination |
| `/article/[slug]` | Article detail | Content, Sharing, Related |
| `/news` | News listing | Breaking news, Search |
| `/news/[slug]` | News detail | Content, Sharing |
| `/dashboard` | User dashboard | Profile, Services, Tasks |
| `/kategori/*` | Product categories | Retail, Business packages |
| `/regional/[region]` | Regional pages | Local content, Pricing |

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t idplay .

# Run container
docker run -p 3000:3000 idplay
```

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
lsof -ti:3000 | xargs kill -9
# or use different port
npm run dev -- -p 3001
```

**Build errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**TypeScript errors:**
```bash
npm run type-check
```

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Images**: Optimized with Next.js Image component

## 🔒 Security

- JWT token authentication
- Input validation with Zod schemas
- XSS protection
- CSRF protection
- Environment variable security

## 📄 License

This project is proprietary software. All rights reserved. 
