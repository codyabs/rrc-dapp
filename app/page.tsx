"use client";

import { useState, useEffect } from "react";
import MTGNMode from "./components/MTGNMode";
import TRAXMode from "./components/TRAXMode";
import ArcadeMode from "./components/ArcadeMode";
import Header from "./components/Header";
import Shop from "./components/Shop";
import { OnboardingModal } from "./components/OnboardingModal";

type GameMode = "mtgn" | "trax" | "arcade";

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>("mtgn");
  const [showShop, setShowShop] = useState(false);
  const [traxBalance, setTraxBalance] = useState<number>(100);
  const [usdcBalance] = useState<number>(500);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Handle onboarding on first visit
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenOnboarding = localStorage.getItem("rrc_onboarding_seen");
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
        localStorage.setItem("rrc_onboarding_seen", "true");
      }
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {showOnboarding && <OnboardingModal onClose={handleOnboardingClose} />}

      <Header
        gameMode={gameMode}
        traxBalance={traxBalance}
        usdcBalance={usdcBalance}
        onShopClick={() => setShowShop(!showShop)}
      />

      {/* Game Mode Selector */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex gap-3 flex-wrap justify-center">
          {[
            { id: "mtgn", label: "🔥 MTGN Mode", desc: "" },
            { id: "trax", label: "💰 TRAX Mode", desc: "Play with tokens" },
            { id: "arcade", label: "🎮 Arcade Mode", desc: "Coming soon" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setGameMode(mode.id as GameMode)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                gameMode === mode.id
                  ? "bg-yellow-600 text-white shadow-lg scale-105"
                  : "bg-roach-700 text-roach-50 hover:bg-roach-600"
              }`}
            >
              <div>{mode.label}</div>
              {mode.desc && <div className="text-xs opacity-75">{mode.desc}</div>}
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
