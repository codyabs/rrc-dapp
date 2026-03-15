# 🪳 RRC dapp - Quick Start

## Install & Run

```bash
cd rrc-dapp
npm install
npm run dev
```

**Visit**: http://localhost:3000

---

## Project Structure at a Glance

```
app/
├── components/
│   ├── Header.tsx - Balance display, wallet button
│   ├── MTGNMode.tsx - Off-chain racing (no tokens)
│   ├── TRAXMode.tsx - Token-based racing
│   ├── ArcadeMode.tsx - Coming soon
│   └── Shop.tsx - Buy items
├── lib/
│   ├── abi.ts - Smart contract ABIs
│   └── gameLogic.ts - Race simulation
├── layout.tsx - Root layout
├── page.tsx - Main game UI
├── providers.tsx - Wagmi setup
└── globals.css - Tailwind styles
```

---

## Game Modes

### 🪳 MTGN Mode (Off-Chain)
- Roll roaches with random stats
- Race without spending tokens
- Track session performance
- Perfect for testing gameplay

### 💰 TRAX Mode (Token-Based)
- Race with real $TRAX stakes
- Select entry amounts: 5, 10, 25, 50, 100
- Win payouts based on position
- Live P&L tracking

### 🎮 Arcade Mode (Coming Soon)
- Mini-games placeholder
- Ready for expansion

---

## Key Commands

| Command | Does |
|---------|------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build (.next/) |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |

---

## Game Logic

**Roll**: Random Speed/Agility/Stamina (0-100)

**Race**: 3 rounds, stat-weighted scoring

**Score**: `speed×0.5 + agility×0.3 + stamina×0.2 + random(0-20)`

**Payouts**:
- 1st: Entry × 2
- 2nd: Entry × 1
- 3rd: Entry × 0.5
- 4th-5th: 0

---

## Smart Contract

**Address**: `0x7edd91c4dd202032872bfbfcd3a4e4f71cb4b8bc`

**Chain**: Abstract Mainnet (2741)

**RPC**: `https://api.mainnet.abs.xyz`

**Functions** (ready to call):
- `balanceOf(address)` - Check $TRAX balance
- `buyShopItem(itemId, qty)` - Buy items
- `topUpTRAX(amount)` - Top-up from USDC
- `swapTRAXForUSDC(amount)` - Convert TRAX → USDC
- `swapUSDCForTRAX(amount)` - Convert USDC → TRAX

---

## Shop Items

| Item | Price | Effect |
|------|-------|--------|
| Speed Serum | 10 | +15 speed |
| Agility Elixir | 10 | +15 agility |
| Stamina Stone | 10 | +15 stamina |
| Racing Legs | 25 | +20 speed, +10 agility |
| Golden Shell | 50 | Cosmetic |
| Lucky Charm | 100 | +10 all stats |

---

## File Sizes

```
First Load JS: 106 KB
Route /: 4.1 KB
Build time: ~5 seconds
Production ready: ✅
```

---

## Development Tips

### Add a Component

```typescript
// app/components/MyComponent.tsx
"use client";

export default function MyComponent() {
  return <div>Hello!</div>;
}
```

### Add Game Logic

```typescript
// app/lib/gameLogic.ts
export function myFunction() {
  // Your logic here
}
```

### Use Wagmi Hook

```typescript
import { useAccount, useBalance } from "wagmi";

const { address } = useAccount();
const { data: balance } = useBalance({ address });
```

---

## Tailwind Styling

Custom roach theme colors:

```
roach-50 (lightest)
roach-100, 200, 300, 400, 500
roach-600, 700, 800
roach-900 (darkest)
```

Example:

```tsx
<div className="bg-roach-800 text-roach-50">Content</div>
```

---

## Debugging

### Check Build
```bash
npm run build
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
```

### Check Logs
```bash
npm run dev
# Look for console errors
```

---

## Next: AGW Integration

1. Install: `npm install @abstract-foundation/agw-react`
2. Follow: `AGW_INTEGRATION.md`
3. Enable: Email/social login
4. Deploy: Production-ready

---

## Deploy (3 Options)

### Vercel (1-click)
```bash
git push to GitHub
Deploy from vercel.com/new
```

### Docker
```bash
docker build -t rrc-dapp .
docker run -p 3000:3000 rrc-dapp
```

### VPS (Ubuntu)
```bash
npm install -g pm2
pm2 start npm --name rrc-dapp -- start
```

See `DEPLOYMENT.md` for details.

---

## Useful Links

- **Docs**: README.md
- **Deployment**: DEPLOYMENT.md
- **Architecture**: PROJECT_SUMMARY.md
- **AGW Setup**: AGW_INTEGRATION.md
- **Abstract**: https://abstract.money
- **Wagmi**: https://wagmi.sh

---

## Common Issues

### Port 3000 in Use
```bash
npx kill-port 3000
npm run dev
```

### Build Fails
```bash
npm ci  # Clean install from lock file
npm run build
```

### Slow RPC
- Check: `https://api.mainnet.abs.xyz/health`
- Or: Switch to testnet temporarily

---

## Success Checklist

- [ ] `npm run dev` starts without errors
- [ ] Can roll roaches in MTGN mode
- [ ] Can enter races
- [ ] Can see results
- [ ] Shop opens/closes
- [ ] Responsive on mobile
- [ ] No TypeScript errors
- [ ] `npm run build` succeeds

---

## Next Steps

1. **Explore** the code
2. **Customize** game values
3. **Test** game logic
4. **Add AGW** for wallet
5. **Deploy** to production

---

**Questions?**

- Code issues → Check component files
- Build issues → See DEPLOYMENT.md
- Logic issues → Review gameLogic.ts

---

**Let's race! 🪳🏁💨**
