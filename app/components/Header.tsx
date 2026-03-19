"use client";

import Image from "next/image";
import { LoginButton } from "./LoginButton";
import { SwapWidget } from "./SwapWidget";

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
  const isConnected = false;

  return (
    <header className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      <div className="flex items-center justify-between flex-wrap gap-6">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Roach Racing Club
            </h1>
            <p className="text-sm text-slate-400">
              Powered by Abstract
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex gap-6 items-center flex-wrap">
          {/* Swap Widget */}
          {isConnected && (
            <SwapWidget
              usdcBalance={usdcBalance}
              traxBalance={traxBalance}
            />
          )}

          {/* Balance Info & Auth */}
          <div className="flex gap-4 items-center flex-wrap">
            {isConnected && (
              <>
                <div className="text-center bg-slate-700 rounded-lg px-4 py-2 border border-slate-600">
                  <p className="text-slate-400 text-xs uppercase tracking-wide">TRAX</p>
                  <p className="text-xl font-bold text-emerald-400">
                    {traxBalance.toFixed(2)}
                  </p>
                </div>
                <div className="text-center bg-slate-700 rounded-lg px-4 py-2 border border-slate-600">
                  <p className="text-slate-400 text-xs uppercase tracking-wide">USDC</p>
                  <p className="text-xl font-bold text-cyan-400">
                    {usdcBalance.toFixed(2)}
                  </p>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <button
              onClick={onShopClick}
              disabled={!isConnected}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:opacity-50 text-white rounded-lg font-semibold transition-all"
            >
              🛍️ Shop
            </button>
            
            {isConnected ? (
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all">
                👛 Wallet
              </button>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
