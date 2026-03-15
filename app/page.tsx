"use client";

import { useState } from "react";
import MTGNMode from "./components/MTGNMode";
import TRAXMode from "./components/TRAXMode";
import ArcadeMode from "./components/ArcadeMode";
import Header from "./components/Header";
import Shop from "./components/Shop";

type GameMode = "mtgn" | "trax" | "arcade";

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>("mtgn");
  const [showShop, setShowShop] = useState(false);
  const [traxBalance, setTraxBalance] = useState<number>(100); // Initial mock balance
  const [usdcBalance] = useState<number>(0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-roach-900 via-roach-800 to-roach-900 p-4 md:p-8">
      <Header
        gameMode={gameMode}
        traxBalance={traxBalance}
        usdcBalance={usdcBalance}
        onShopClick={() => setShowShop(!showShop)}
      />

      {/* Game Mode Selector */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex gap-4 flex-wrap justify-center">
          {[
            { id: "mtgn", label: "🪳 MTGN Mode" },
            { id: "trax", label: "💰 TRAX Mode" },
            { id: "arcade", label: "🎮 Arcade Mode" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setGameMode(mode.id as GameMode)}
              className={`px-8 py-4 rounded-xl font-bold transition-all transform duration-200 ${
                gameMode === mode.id
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-xl shadow-yellow-500/50 scale-105 hover:scale-110"
                  : "bg-gradient-to-br from-roach-700 to-roach-800 text-roach-50 hover:from-roach-600 hover:to-roach-700 hover:shadow-lg hover:scale-102"
              }`}
            >
              {mode.label}
            </button>
          ))}
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
      <div className="max-w-6xl mx-auto">
        {gameMode === "mtgn" && <MTGNMode />}
        {gameMode === "trax" && (
          <TRAXMode
            traxBalance={traxBalance}
            onBalanceChange={setTraxBalance}
          />
        )}
        {gameMode === "arcade" && <ArcadeMode />}
      </div>
    </main>
  );
}
