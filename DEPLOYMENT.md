# 🪳 RRC Dapp Deployment Guide

## Quick Start (Local)

```bash
cd rrc-dapp
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Deploying to Production

### Option 1: Vercel (Recommended)

[Vercel](https://vercel.com) is the easiest way to deploy Next.js apps.

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: RRC dapp"
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Connect your GitHub repo
   - Click "Deploy"
   - Done! Your dapp is live

3. **Environment Variables** (if needed)
   - Add to Vercel dashboard under "Settings > Environment Variables"

### Option 2: Docker + Any Host

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build & run:
```bash
docker build -t rrc-dapp .
docker run -p 3000:3000 rrc-dapp
```

### Option 3: Traditional Server (Ubuntu/Debian)

```bash
# SSH into your server
ssh user@your-domain.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <your-repo-url> rrc-dapp
cd rrc-dapp
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "rrc-dapp" -- start
pm2 save
pm2 startup
```

---

## Configuration

### RPC Endpoints

The dapp uses Abstract mainnet by default:

```typescript
// app/providers.tsx
const config = createConfig({
  chains: [abstract],
  transports: {
    [abstract.id]: http("https://api.mainnet.abs.xyz"),
  },
});
```

For testnet, switch to:
```typescript
import { abstractTestnet } from "viem/chains";
// ...
[abstractTestnet.id]: http("https://api.testnet.abs.xyz"),
```

### Contract Address

Update in `app/lib/abi.ts`:
```typescript
export const GAME_CONTRACT_ADDRESS = "0x7edd91c4dd202032872bfbfcd3a4e4f71cb4b8bc";
```

---

## Performance Optimization

### Caching

Add to `next.config.ts`:
```typescript
headers: async () => [
  {
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=3600' },
    ],
  },
],
```

### Image Optimization

Future: Add roach graphics via `<Image>` component for automatic optimization.

---

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
```

Then configure in `instrumentation.ts`.

### Analytics

Add Vercel Analytics or Google Analytics:
```bash
npm install @vercel/analytics @vercel/web-vitals
```

---

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS (Vercel/certbot for self-hosted)
- [ ] Add rate limiting for API routes
- [ ] Validate all user inputs
- [ ] Review smart contract interactions

---

## Troubleshooting

### Build Fails
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Find and kill process on port 3000
npx kill-port 3000
npm run dev
```

### Slow Loads
- Check RPC health: `https://api.mainnet.abs.xyz/health`
- Review Network tab in DevTools
- Consider caching strategy

---

## Support

- **Docs**: https://docs.abstract.money
- **Discord**: https://discord.gg/abstract
- **GitHub Issues**: Report bugs on your repo

---

Happy Racing! 🪳🏁
