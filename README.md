# 🪳 Roach Racing Club - Game dapp

A modern Web3 gaming dapp for Roach Racing Club on [Abstract L2](https://abstract.money), built with Next.js, React, Viem, and Wagmi.

## Features

### Game Modes

1. **🪳 MTGN Mode** - Off-chain racing with no token requirements
   - Roll custom roaches with random stats
   - Race against AI opponents
   - Reroll to get better stats
   - Track session performance

2. **💰 TRAX Mode** - Play with real $TRAX tokens
   - Higher stakes, higher rewards
   - Configurable entry amounts (5, 10, 25, 50, 100 TRAX)
   - Live P&L tracking
   - Win/loss statistics

3. **🎮 Arcade Mode** - Coming soon
   - Mini-games and challenges
   - Leaderboards and rewards

### Gameplay Mechanics

- **Roach Stats**: Each roach has Speed, Agility, and Stamina
- **Race Simulation**: Multi-round racing with stat-based calculations
- **Winnings System**:
  - 1st Place: Full payout
  - 2nd Place: 50% of entry
  - 3rd Place: 25% of entry
  - 4th-5th: No reward

### Shop System

Purchase items with $TRAX to boost your roach:
- **⚡ Boosts**: Temporary stat increases (Speed Serum, Agility Elixir, etc.)
- **🛡️ Equipment**: Permanent gear upgrades (Racing Legs, Lucky Charm, etc.)
- **✨ Cosmetics**: Visual customization (Golden Shell, etc.)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS + custom roach-themed colors
- **Web3**: Viem 2.x, Wagmi 2.x
- **Wallet**: Abstract Global Wallet (AGW) integration _(ready to add)_
- **Network**: Abstract Mainnet (Chain 2741)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd rrc-dapp
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Smart Contract Integration

The dapp connects to the game contract on Abstract mainnet:

**Contract Address**: `0x7edd91c4dd202032872bfbfcd3a4e4f71cb4b8bc`

**Chain**: Abstract Mainnet (2741)

**RPC**: `https://api.mainnet.abs.xyz`

### Supported Functions

- `balanceOf(address)` - Check $TRAX balance
- `buyShopItem(itemId, quantity)` - Purchase shop items
- `topUpTRAX(amount)` - Top-up TRAX from USDC contract
- `swapTRAXForUSDC(traxAmount)` - Convert TRAX → USDC
- `swapUSDCForTRAX(usdcAmount)` - Convert USDC → TRAX
- `getShopItems()` - Retrieve available shop items

## Project Structure

```
rrc-dapp/
├── app/
│   ├── components/
│   │   ├── Header.tsx           # Header with balance display
│   │   ├── MTGNMode.tsx         # Off-chain racing mode
│   │   ├── TRAXMode.tsx         # Token-based racing
│   │   ├── ArcadeMode.tsx       # Arcade stub
│   │   └── Shop.tsx             # Item shop
│   ├── lib/
│   │   ├── abi.ts              # Smart contract ABIs
│   │   └── gameLogic.ts        # Off-chain game logic
│   ├── hooks/
│   │   └── (custom hooks)
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main game interface
│   ├── providers.tsx           # Wagmi + React Query setup
│   └── globals.css             # Tailwind + custom styles
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── README.md
```

## Game Logic

### Roach Stats Calculation

- Each roach has 3 stats (0-100):
  - **Speed** (50% weight)
  - **Agility** (30% weight)
  - **Stamina** (20% weight)

### Race Simulation

1. Player and 4 AI opponents enter the race
2. Each stat is weighted and scored per round
3. 3 rounds are simulated for variety
4. Final ranking determines winnings

```typescript
const score = speed * 0.5 + agility * 0.3 + stamina * 0.2 + randomFactor;
```

## State Management

- **Local State**: React `useState` for game session data
- **Off-chain Storage**: Game progress stored in browser (localStorage-ready)
- **On-chain State**: $TRAX balances and shop items via smart contract

_(Future: Local storage for persistent game progress, backend for leaderboards)_

## Wallet Integration (Next Steps)

1. **Abstract Global Wallet** integration for seamless onboarding
2. **Email/social login** via AGW
3. **Gas sponsorship** for player transactions
4. **Session keys** for frictionless gameplay

## Security Notes

- Private keys are never stored in the frontend
- All transactions signed via connected wallet
- Smart contract interactions validated on-chain
- No hardcoded secrets in code

## Customization

### Colors

Edit `tailwind.config.ts` to customize the roach color palette:

```typescript
roach: {
  50: "#f9f7f4",
  900: "#2f2923",
  // ...
}
```

### Game Balance

Adjust game payouts in `lib/gameLogic.ts`:

```typescript
const payouts: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 100,  // 1st place payout
  2: 50,   // 2nd place payout
  // ...
};
```

### Shop Items

Edit `getDefaultShopItems()` to add or modify shop offerings.

## Performance

- Optimized React components with memoization
- Efficient CSS with Tailwind
- Next.js image optimization for roach graphics (ready)
- Lazy-loaded game modes

## Roadmap

- [ ] Abstract Global Wallet login
- [ ] Persistent game state (localStorage)
- [ ] Player leaderboard (backend)
- [ ] NFT cosmetics and gear
- [ ] Multiplayer racing lobbies
- [ ] Mobile-optimized UI
- [ ] Arcade mini-games
- [ ] Tournament mode

## License

MIT

## Support

For issues or questions, reach out via:
- GitHub Issues: _(add repo link)_
- Discord: _(add link)_
- Email: _(add email)_

---

**Play on Abstract. Race roaches. Win TRAX!** 🪳🏁💨
