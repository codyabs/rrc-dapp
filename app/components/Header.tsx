"use client";

import Image from "next/image";
import { LoginButton } from "./LoginButton";

type HeaderProps = {
  gameMode?: "mtgn" | "trax" | "arcade";
  traxBalance: number;
  usdcBalance: number;
  onShopClick: () => void;
};

export default function Header({
  traxBalance,
  usdcBalance,
  onShopClick,
}: HeaderProps) {
  // For now, assume not connected until AGW is fully integrated
  const isConnected = false;;

  return (
    <header className="max-w-6xl mx-auto mb-8 bg-roach-800 rounded-xl p-6 shadow-2xl border border-roach-700">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Logo with Image */}
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16">
            <Image
              src="/Dik04rEcKe7BWnsZhM027.png"
              alt="Roach Racing Club Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              Roach Racing Club
            </h1>
            <p className="text-sm text-roach-300">
              Play on Abstract, built by Cody
            </p>
          </div>
        </div>

        {/* Balance Info & Auth */}
        <div className="flex gap-6 items-center flex-wrap">
          {isConnected && (
            <>
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
            </>
          )}

          {/* Action Buttons */}
          <button
            onClick={onShopClick}
            disabled={!isConnected}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-all"
          >
            🛍️ Shop
          </button>
          
          {isConnected ? (
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all">
              👛 Wallet
            </button>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
}
