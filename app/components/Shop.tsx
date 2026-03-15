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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-roach-800 via-roach-850 to-roach-900 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto border border-yellow-600/30 shadow-2xl shadow-yellow-600/20">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-roach-900 to-roach-800 px-6 py-4 border-b border-yellow-600/20 flex justify-between items-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">🛍️ Shop</h2>
          <button
            onClick={onClose}
            className="text-roach-300 hover:text-yellow-400 hover:scale-110 text-2xl font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Balance Display */}
          <div className="mb-6 bg-gradient-to-r from-green-700/30 to-green-800/20 rounded-lg p-4 text-center border border-green-600/30 shadow-lg shadow-green-500/20">
            <p className="text-roach-300 text-sm">Your $TRAX Balance</p>
            <p className="text-4xl font-bold text-green-400">{traxBalance.toFixed(0)}</p>
          </div>

          {/* Category Filters */}
          <div className="mb-6 flex gap-3 flex-wrap">
            {[
              { id: "all", label: "All Items" },
              { id: "boost", label: "⚡ Boosts" },
              { id: "equipment", label: "🛡️ Equipment" },
              { id: "cosmetic", label: "✨ Cosmetics" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-5 py-2 rounded-lg font-semibold transition-all transform ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg shadow-yellow-500/50 scale-105"
                    : "bg-gradient-to-r from-roach-700 to-roach-750 text-roach-300 hover:from-roach-600 hover:to-roach-700 hover:text-roach-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const canAfford = traxBalance >= item.price;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition-all transform duration-200 ${
                    canAfford
                      ? "bg-gradient-to-br from-roach-700 to-roach-800 border-yellow-600/30 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-1 cursor-pointer"
                      : "bg-gradient-to-br from-roach-800 to-roach-900 border-roach-700 opacity-50"
                  }`}
                >
                  {/* Item Info */}
                  <h3 className="font-bold text-roach-50 mb-1 text-lg">{item.name}</h3>
                  <p className="text-xs text-yellow-600/80 mb-3 capitalize font-semibold">{item.category}</p>

                  {/* Effect Display */}
                  {item.effect && (
                    <div className="text-sm text-roach-200 mb-4 space-y-2 bg-roach-900/40 rounded p-3">
                      {item.effect.speed && (
                        <p className="text-red-400">⚡ Speed +{item.effect.speed}</p>
                      )}
                      {item.effect.agility && (
                        <p className="text-orange-400">🤸 Agility +{item.effect.agility}</p>
                      )}
                      {item.effect.stamina && (
                        <p className="text-green-400">💪 Stamina +{item.effect.stamina}</p>
                      )}
                    </div>
                  )}

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-roach-600">
                    <span className="font-bold text-green-400 text-lg">
                      {item.price} $TRAX
                    </span>
                    <button
                      onClick={() => handlePurchase(item.id, item.price)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all transform ${
                        canAfford
                          ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-green-500/50"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {canAfford ? "Buy" : "Locked"}
                    </button>
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
