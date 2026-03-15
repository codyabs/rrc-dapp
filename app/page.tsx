"use client";

import { useState } from "react";
import MTGNMode from "./components/MTGNMode";
import TRAXMode from "./components/TRAXMode";
import ArcadeMode from "./components/ArcadeMode";
import Header from "./components/Header";
import Shop from "./components/Shop";

type GameMode = "mtgn" | "trax" | "arcade";

const GAME_MODES = [
  { id: "mtgn" as const, label: "MTGN", icon: "🪳", description: "Mutant Tournament Gaming Network" },
  { id: "trax" as const, label: "TRAX", icon: "💰", description: "Trading & Racing" },
  { id: "arcade" as const, label: "ARCADE", icon: "🎮", description: "Arcade Classics" },
];

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>("mtgn");
  const [showShop, setShowShop] = useState(false);
  const [traxBalance, setTraxBalance] = useState<number>(100);
  const [usdcBalance] = useState<number>(0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-roach-900 to-black pt-20 pb-12">
      <Header
        gameMode={gameMode}
        traxBalance={traxBalance}
        usdcBalance={usdcBalance}
        onShopClick={() => setShowShop(!showShop)}
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Mode Selector - Premium Tab Design */}
        <div className="mb-12 mt-8">
          <div className="relative bg-gradient-to-r from-roach-900/50 via-roach-800/30 to-roach-900/50 rounded-2xl p-1 border border-yellow-500/20 shadow-2xl shadow-yellow-600/10">
            {/* Tab Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 to-transparent rounded-2xl pointer-events-none" />
            
            {/* Mode Tabs Container */}
            <div className="relative flex gap-2 md:gap-3 justify-center items-stretch">
              {GAME_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setGameMode(mode.id)}
                  className={`flex-1 md:flex-none px-6 md:px-8 py-4 rounded-xl font-bold transition-all duration-300 transform relative group cursor-pointer ${
                    gameMode === mode.id
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-2xl shadow-yellow-500/60 scale-100"
                      : "bg-gradient-to-br from-roach-700/40 to-roach-800/40 text-roach-100 hover:from-roach-700/60 hover:to-roach-800/60 hover:text-white"
                  }`}
                >
                  {/* Glow Effect for Active Tab */}
                  {gameMode === mode.id && (
                    <div className="absolute inset-0 rounded-xl bg-yellow-400/20 blur-xl -z-10 group-hover:blur-2xl transition-all" />
                  )}
                  
                  {/* Tab Content */}
                  <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <span className="text-lg md:text-xl">{mode.icon}</span>
                    <div className="text-left hidden md:block">
                      <div className="font-black text-base">{mode.label}</div>
                      <div className={`text-xs font-semibold transition-colors ${
                        gameMode === mode.id 
                          ? "text-black/70"
                          : "text-roach-300 group-hover:text-roach-100"
                      }`}>
                        {mode.description}
                      </div>
                    </div>
                    <div className="md:hidden font-black text-base">{mode.label}</div>
                  </div>

                  {/* Active Indicator */}
                  {gameMode === mode.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shop Panel */}
        {showShop && (
          <Shop
            traxBalance={traxBalance}
            onClose={() => setShowShop(false)}
            onPurchase={(amount) => setTraxBalance(Math.max(0, traxBalance - amount))}
          />
        )}

        {/* Game Mode Content */}
        <div className="relative">
          {/* Content Container Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10 rounded-3xl blur-2xl pointer-events-none" />
          
          {/* Content */}
          <div className="relative">
            {gameMode === "mtgn" && <MTGNMode />}
            {gameMode === "trax" && (
              <TRAXMode
                traxBalance={traxBalance}
                onBalanceChange={setTraxBalance}
              />
            )}
            {gameMode === "arcade" && <ArcadeMode />}
          </div>
        </div>
      </div>
    </main>
  );
}
