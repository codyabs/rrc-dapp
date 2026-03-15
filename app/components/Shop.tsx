"use client";

import { useState } from "react";
import { getDefaultShopItems } from "@/app/lib/gameLogic";

type ShopProps = {
  traxBalance: number;
  onClose: () => void;
  onPurchase: (amount: number) => void;
};

export default function Shop({ traxBalance, onClose, onPurchase }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "boost" | "equipment" | "cosmetic">("all");
  const items = getDefaultShopItems();
  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter((item) => item.category === selectedCategory);

  const handlePurchase = (_itemId: number, price: number) => {
    if (traxBalance >= price) {
      onPurchase(price);
      alert("✅ Item purchased!");
    } else {
      alert("❌ Insufficient $TRAX");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-black via-roach-900 to-roach-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-500/40 shadow-2xl shadow-yellow-600/30 relative">
        {/* Premium Border Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 rounded-2xl blur-xl -z-10" />
        
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-black via-roach-900 to-black px-6 py-5 border-b-2 border-yellow-500/30 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">🛍️</span>
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
              PREMIUM SHOP
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-roach-300 hover:text-yellow-400 hover:scale-125 hover:rotate-90 text-2xl font-bold transition-all duration-300 bg-roach-800/50 hover:bg-yellow-600/20 w-10 h-10 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Balance Display - Premium Style */}
          <div className="mb-8 bg-gradient-to-r from-green-900/50 via-green-800/30 to-green-900/50 rounded-xl p-6 text-center border-2 border-green-500/40 shadow-xl shadow-green-500/20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-green-400/80 text-sm font-bold uppercase tracking-widest mb-2">Your $TRAX Balance</p>
              <p className="text-5xl md:text-6xl font-black text-green-300 drop-shadow-[0_0_16px_rgba(134,239,172,0.4)]">
                {traxBalance.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Category Filters - Premium Tab Style */}
          <div className="mb-8 flex gap-2 flex-wrap justify-center md:justify-start">
            {[
              { id: "all", label: "All Items", icon: "📦" },
              { id: "boost", label: "Boosts", icon: "⚡" },
              { id: "equipment", label: "Equipment", icon: "🛡️" },
              { id: "cosmetic", label: "Cosmetics", icon: "✨" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 transform relative group ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-xl shadow-yellow-500/50 scale-105"
                    : "bg-gradient-to-br from-roach-700/50 to-roach-800/50 text-roach-300 hover:from-roach-600 hover:to-roach-700 hover:text-roach-100 border border-roach-600/50 hover:border-yellow-500/30"
                }`}
              >
                {selectedCategory === cat.id && (
                  <div className="absolute inset-0 rounded-lg bg-yellow-400/20 blur-lg -z-10" />
                )}
                <span className="text-base md:text-lg">{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid - Premium Card Design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const canAfford = traxBalance >= item.price;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border-2 p-5 transition-all duration-300 transform relative group overflow-hidden ${
                    canAfford
                      ? "bg-gradient-to-br from-roach-700/50 to-roach-800/50 border-yellow-500/40 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 cursor-pointer"
                      : "bg-gradient-to-br from-roach-800/30 to-roach-900/30 border-roach-700/40 opacity-60"
                  }`}
                >
                  {/* Premium Glow */}
                  {canAfford && (
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    {/* Item Name & Category */}
                    <div className="mb-3">
                      <h3 className="font-black text-lg md:text-xl text-roach-50 group-hover:text-yellow-300 transition-colors">
                        {item.name}
                      </h3>
                      <p className={`text-xs uppercase font-bold tracking-wider mt-1 ${
                        canAfford ? "text-yellow-500/70 group-hover:text-yellow-400" : "text-roach-400"
                      }`}>
                        {item.category}
                      </p>
                    </div>

                    {/* Effect Display - Premium */}
                    {item.effect && (
                      <div className="text-sm mb-4 space-y-2 bg-roach-900/60 border border-roach-700/50 rounded-xl p-3">
                        {item.effect.speed && (
                          <p className="text-red-400 font-bold">⚡ Speed +{item.effect.speed}</p>
                        )}
                        {item.effect.agility && (
                          <p className="text-orange-400 font-bold">🤸 Agility +{item.effect.agility}</p>
                        )}
                        {item.effect.stamina && (
                          <p className="text-green-400 font-bold">💪 Stamina +{item.effect.stamina}</p>
                        )}
                      </div>
                    )}

                    {/* Price and Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-roach-700/50">
                      <span className={`font-black text-xl drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] ${
                        canAfford ? "text-green-400" : "text-roach-500"
                      }`}>
                        {item.price} $TRAX
                      </span>
                      <button
                        onClick={() => handlePurchase(item.id, item.price)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-lg text-sm font-black transition-all duration-300 transform uppercase tracking-wider ${
                          canAfford
                            ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white hover:scale-110 shadow-lg hover:shadow-xl hover:shadow-green-500/60 border border-green-400/50"
                            : "bg-roach-800 text-roach-600 cursor-not-allowed opacity-60"
                        }`}
                      >
                        {canAfford ? "Buy" : "Locked"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
