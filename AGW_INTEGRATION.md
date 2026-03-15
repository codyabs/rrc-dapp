# 🪳 Abstract Global Wallet (AGW) Integration Guide

This guide explains how to add **Abstract Global Wallet** support to the RRC dapp for seamless email/social login and gas sponsorship.

---

## What is AGW?

Abstract Global Wallet enables:
- 🔐 Email/social login (no MetaMask needed)
- ⛽ Gas sponsorship for players
- 🔑 Session keys for frictionless gameplay
- 👛 Smart contract wallet integration

---

## Setup Steps

### 1. Install AGW Packages

```bash
npm install @abstract-foundation/agw-react @abstract-foundation/agw-client
```

### 2. Update Providers

**File**: `app/providers.tsx`

```typescript
"use client";

import React, { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { abstract } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AbstractWalletProvider } from "@abstract-foundation/agw-react";

const config = createConfig({
  chains: [abstract],
  transports: {
    [abstract.id]: http("https://api.mainnet.abs.xyz"),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <AbstractWalletProvider>
          {children}
        </AbstractWalletProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
```

### 3. Create Login Component

**File**: `app/components/LoginButton.tsx`

```typescript
"use client";

import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useState } from "react";

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithAbstract } = useLoginWithAbstract();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithAbstract({
        authMethod: "email", // or "google", "github", "passkey"
      });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white rounded-lg font-bold"
    >
      {isLoading ? "Connecting..." : "🔐 Login with AGW"}
    </button>
  );
}
```

### 4. Update Header with Login

**File**: `app/components/Header.tsx`

```typescript
"use client";

import { useAccount } from "wagmi";
import LoginButton from "./LoginButton";

type HeaderProps = {
  traxBalance: number;
  usdcBalance: number;
  onShopClick: () => void;
};

export default function Header({
  traxBalance,
  usdcBalance,
  onShopClick,
}: HeaderProps) {
  const { address, isConnected } = useAccount();

  return (
    <header className="max-w-6xl mx-auto mb-8 bg-roach-800 rounded-xl p-6 shadow-2xl border border-roach-700">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-5xl">🪳</span>
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              Roach Racing Club
            </h1>
            <p className="text-sm text-roach-300">
              Play on Abstract • Chain 2741
            </p>
          </div>
        </div>

        {/* Balance Info (only if connected) */}
        {isConnected && (
          <div className="flex gap-6 items-center">
            <div className="text-center">
              <p className="text-roach-300 text-sm">$TRAX Balance</p>
              <p className="text-2xl font-bold text-green-400">
                {traxBalance.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-roach-300 text-sm">$USDC Balance</p>
              <p className="text-2xl font-bold text-blue-400">
                {usdcBalance.toFixed(2)}
              </p>
            </div>

            {/* Action Buttons */}
            <button
              onClick={onShopClick}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all"
            >
              🛍️ Shop
            </button>

            {/* Wallet Address */}
            <div className="px-4 py-2 bg-roach-700 rounded-lg text-sm">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
          </div>
        )}

        {/* Login Button (if not connected) */}
        {!isConnected && <LoginButton />}
      </div>
    </header>
  );
}
```

### 5. Create Contract Interaction Hook

**File**: `app/hooks/useGameContract.ts`

```typescript
"use client";

import { useWriteContract, useReadContract } from "wagmi";
import { GAME_CONTRACT_ADDRESS, GAME_CONTRACT_ABI } from "@/app/lib/abi";
import { useAccount } from "wagmi";

export function useGameContract() {
  const { address } = useAccount();

  // Read: Check TRAX balance
  const { data: traxBalance } = useReadContract({
    address: GAME_CONTRACT_ADDRESS,
    abi: GAME_CONTRACT_ABI,
    functionName: "balanceOf",
    args: [address!],
    enabled: !!address,
  });

  // Write: Buy shop item
  const { write: buyShopItem } = useWriteContract();

  const handleBuyItem = async (itemId: number) => {
    buyShopItem({
      address: GAME_CONTRACT_ADDRESS,
      abi: GAME_CONTRACT_ABI,
      functionName: "buyShopItem",
      args: [BigInt(itemId), BigInt(1)],
    });
  };

  // Write: Swap TRAX for USDC
  const { write: swapTRAX } = useWriteContract();

  const handleSwapTRAX = async (amount: bigint) => {
    swapTRAX({
      address: GAME_CONTRACT_ADDRESS,
      abi: GAME_CONTRACT_ABI,
      functionName: "swapTRAXForUSDC",
      args: [amount],
    });
  };

  return {
    traxBalance: traxBalance ? Number(traxBalance) : 0,
    buyShopItem: handleBuyItem,
    swapTRAX: handleSwapTRAX,
  };
}
```

### 6. Update Shop Component with Contract

**File**: `app/components/Shop.tsx`

```typescript
"use client";

import { useState } from "react";
import { getDefaultShopItems } from "@/app/lib/gameLogic";
import { useGameContract } from "@/app/hooks/useGameContract";

type ShopProps = {
  traxBalance: number;
  onClose: () => void;
};

export default function Shop({ traxBalance, onClose }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "boost" | "equipment" | "cosmetic">("all");
  const { buyShopItem } = useGameContract();
  const items = getDefaultShopItems();

  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter((item) => item.category === selectedCategory);

  const handlePurchase = async (_itemId: number, price: number) => {
    if (traxBalance >= price) {
      try {
        await buyShopItem(_itemId);
        alert("✅ Transaction submitted!");
      } catch (error) {
        alert("❌ Transaction failed");
      }
    } else {
      alert("❌ Insufficient $TRAX");
    }
  };

  // ... rest of Shop component
}
```

---

## AGW Features to Enable

### 1. Gas Sponsorship

AGW handles gas fees automatically for users:

```typescript
// No extra code needed! AGW abstracts away gas
// Users see transactions without paying gas directly
```

### 2. Session Keys

For repeated actions (multiple races):

```typescript
// Session keys allow gaming without signing every transaction
// Reduces friction, keeps security
const { sessionKey } = useAbstractClient();
```

### 3. Passkey Login

Optional passwordless login:

```typescript
await loginWithAbstract({
  authMethod: "passkey", // Biometric + hardware key backup
});
```

---

## Testing Integration

### Local Testing

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Click "🔐 Login with AGW"
# Authenticate with email/social
# See balance & buy items
```

### Environment Setup

Add to `.env.local`:

```env
# AGW Configuration (get from dashboard)
NEXT_PUBLIC_AGW_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_AGW_REDIRECT_URL=http://localhost:3000/auth/callback
```

### Testnet vs Mainnet

```typescript
// For Abstract Testnet
import { abstractTestnet } from "viem/chains";

const config = createConfig({
  chains: [abstractTestnet],
  transports: {
    [abstractTestnet.id]: http("https://api.testnet.abs.xyz"),
  },
});
```

---

## Contract Calls Example

### Buy a Shop Item

```typescript
// User clicks "Buy"
const tx = await buyShopItem(1); // Speed Serum

// AGW handles:
// 1. Gas estimation
// 2. Gas sponsorship
// 3. Transaction signing
// 4. Block confirmation
```

### Swap TRAX for USDC

```typescript
// User swaps 50 TRAX for USDC
const tx = await swapTRAX(parseEther("50"));

// Contract returns USDC received
```

---

## Error Handling

```typescript
try {
  await loginWithAbstract({ authMethod: "email" });
} catch (error) {
  if (error.code === "USER_CANCELLED") {
    console.log("User closed login dialog");
  } else if (error.code === "NETWORK_ERROR") {
    console.log("Network failed, retry");
  } else {
    console.error("Unknown error:", error);
  }
}
```

---

## Security Best Practices

1. **Never log private keys** (AGW handles this)
2. **Validate addresses** on frontend before transactions
3. **Check balance** before transactions
4. **Confirm amounts** before signing
5. **Use HTTPS** in production

---

## Debugging

### Check Wallet Connection

```typescript
import { useAccount } from "wagmi";

function DebugHeader() {
  const { address, isConnected, chain } = useAccount();
  
  return (
    <div>
      Connected: {isConnected ? "✅" : "❌"}
      Address: {address}
      Chain: {chain?.name}
    </div>
  );
}
```

### Monitor Transactions

```typescript
// Wagmi automatically tracks transaction state
const { isPending, isSuccess, isError } = useWriteContract();

if (isPending) return <div>Waiting for signature...</div>;
if (isSuccess) return <div>Transaction confirmed!</div>;
if (isError) return <div>Transaction failed!</div>;
```

---

## Resources

- **AGW Docs**: https://docs.abstract.money/agw
- **Wagmi Docs**: https://wagmi.sh/react/api/hooks
- **Viem Docs**: https://viem.sh
- **Abstract Docs**: https://docs.abstract.money

---

## Next Steps

1. ✅ This guide provides all integration code
2. 📋 Follow steps 1-6 above
3. 🧪 Test on testnet first
4. 🚀 Deploy to production
5. 🎮 Enable real $TRAX transactions

---

## Support

- Issues? Check `PROJECT_SUMMARY.md`
- Build errors? See `DEPLOYMENT.md`
- Questions? Review README.md

---

**Ready to add AGW? Let's go! 🚀**
