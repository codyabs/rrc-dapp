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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-roach-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto border border-roach-700 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-roach-900 px-6 py-4 border-b border-roach-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-400">🛍️ Shop</h2>
          <button
            onClick={onClose}
            className="text-roach-300 hover:text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Balance Display */}
          <div className="mb-6 bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Your $TRAX Balance</p>
            <p className="text-3xl font-bold text-green-400">{traxBalance.toFixed(0)}</p>
          </div>

          {/* Category Filters */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {[
              { id: "all", label: "All Items" },
              { id: "boost", label: "⚡ Boosts" },
              { id: "equipment", label: "🛡️ Equipment" },
              { id: "cosmetic", label: "✨ Cosmetics" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-yellow-600 text-white"
                    : "bg-roach-700 text-roach-300 hover:bg-roach-600"
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
                  className={`rounded-lg border p-4 transition-all ${
                    canAfford
                      ? "bg-roach-700 border-roach-600 hover:border-yellow-400"
                      : "bg-roach-800 border-roach-700 opacity-60"
                  }`}
                >
                  {/* Item Info */}
                  <h3 className="font-bold text-roach-50 mb-1">{item.name}</h3>
                  <p className="text-xs text-roach-300 mb-3 capitalize">{item.category}</p>

                  {/* Effect Display */}
                  {item.effect && (
                    <div className="text-xs text-roach-300 mb-3 space-y-1">
                      {item.effect.speed && (
                        <p>⚡ Speed +{item.effect.speed}</p>
                      )}
                      {item.effect.agility && (
                        <p>🏃 Agility +{item.effect.agility}</p>
                      )}
                      {item.effect.stamina && (
                        <p>💪 Stamina +{item.effect.stamina}</p>
                      )}
                    </div>
                  )}

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-roach-600">
                    <span className="font-bold text-green-400">
                      {item.price} $TRAX
                    </span>
                    <button
                      onClick={() => handlePurchase(item.id, item.price)}
                      disabled={!canAfford}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                        canAfford
                          ? "bg-green-600 hover:bg-green-500 text-white"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
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
