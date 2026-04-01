# IDPlay System Requirements

## � Deployment Requirements

### Server Specifications

#### Small Scale (< 1,000 visitors/day)
- **CPU**: 2 vCPU
- **RAM**: 4GB
- **Storage**: 50GB SSD
- **OS**: Ubuntu 20.04 LTS
- **Network**: 100Mbps

#### Medium Scale (< 10,000 visitors/day)
- **CPU**: 4 vCPU  
- **RAM**: 8GB
- **Storage**: 100GB SSD
- **OS**: Ubuntu 20.04 LTS
- **Network**: 1Gbps

### Required Software
```bash
Node.js: 18.17.0+
npm: 9.0.0+
PM2: Latest (process manager)
Nginx: Latest (reverse proxy)
```

### Environment Variables
```bash
# Required
NEXT_PUBLIC_CMS_URL=https://your-strapi-url.com
NEXT_PUBLIC_BASE_URL=https://your-api-url.com

# Optional
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_maps_key
```

## �️ Deployment Options

### Option 1: Vercel (Recommended - Easiest)
```bash
# 1. Connect GitHub repo to Vercel
# 2. Set environment variables in Vercel dashboard
# 3. Deploy automatically on git push

# Cost: $0-20/month
# Setup time: 5 minutes
```

### Option 2: VPS/Cloud Server
```bash
# 1. Server setup
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs nginx certbot python3-certbot-nginx

# 2. Application deployment
git clone your-repo
cd idplay
npm install
npm run build

# 3. Process manager
npm install -g pm2
pm2 start npm --name "idplay" -- start
pm2 startup && pm2 save

# 4. Nginx reverse proxy
# Configure nginx to proxy to localhost:3000

# 5. SSL certificate
certbot --nginx -d yourdomain.com
```

## 🔧 External Services Required

### CMS
- **Purpose**: Content management
- **Requirements**: Separate server or cloud hosting

### API Backend  
- **Purpose**: Product data, user management
- **Requirements**: REST API server
- **Database**: PostgreSQL or MySQL

### Optional Services
- Google Maps API (for coverage maps)
- Analytics (Google Analytics)
- CDN (CloudFlare - free plan available)

## 🚀 Quick Start Commands

```bash
# Clone and setup
git clone <repository>
cd idplay
npm install

# Development
npm run dev

# Production build
npm run build
npm start

# Deploy to Vercel
npx vercel
```

---
**Deployment guide for IDPlay Next.js application**
