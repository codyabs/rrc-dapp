"use client";

import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_race",
    name: "First Steps",
    description: "Complete your first race",
    icon: "🏁",
    unlocked: false,
  },
  {
    id: "first_win",
    name: "Victory!",
    description: "Win your first race",
    icon: "🥇",
    unlocked: false,
  },
  {
    id: "five_wins",
    name: "Racing Star",
    description: "Win 5 races",
    icon: "⭐",
    unlocked: false,
  },
  {
    id: "ten_wins",
    name: "Champion",
    description: "Win 10 races",
    icon: "👑",
    unlocked: false,
  },
  {
    id: "perfect_ten",
    name: "Perfect Speed",
    description: "Get a roach with 10 speed",
    icon: "⚡",
    unlocked: false,
  },
  {
    id: "balanced_roach",
    name: "Perfectly Balanced",
    description: "Get a roach with 8+ in all stats",
    icon: "⚖️",
    unlocked: false,
  },
  {
    id: "rich_racer",
    name: "Fat Wallet",
    description: "Earn $100 total",
    icon: "💰",
    unlocked: false,
  },
  {
    id: "shop_lover",
    name: "Shopaholic",
    description: "Buy 5 items from the shop",
    icon: "🛍️",
    unlocked: false,
  },
];

export function AchievementBadges() {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load achievements from localStorage
      const stored = localStorage.getItem("rrc_achievements");
      if (stored) {
        const unlockedIds = JSON.parse(stored) as string[];
        setAchievements((prev) =>
          prev.map((ach) => ({
            ...ach,
            unlocked: unlockedIds.includes(ach.id),
          }))
        );
      }
    }
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="bg-gray-800 border-2 border-amber-500 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">🏅 Achievements</h2>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-amber-400 font-bold">
            {unlockedCount}/{totalCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 text-center transition-all transform ${
              achievement.unlocked
                ? "bg-gradient-to-b from-amber-900 to-orange-900 border-amber-400 shadow-lg shadow-amber-500/50"
                : "bg-gray-700 border-gray-600 opacity-50"
            }`}
          >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <h3 className="text-sm font-bold text-amber-300 mb-1">{achievement.name}</h3>
            <p className="text-xs text-gray-300">{achievement.description}</p>
            {achievement.unlocked && (
              <div className="mt-2 text-xs text-amber-400 font-semibold">✓ Unlocked</div>
            )}
          </div>
        ))}
      </div>

      {unlockedCount === totalCount && (
        <div className="mt-6 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg p-4 text-center">
          <p className="text-white font-bold text-lg">🎉 All Achievements Unlocked!</p>
          <p className="text-amber-100 text-sm">You are a true Roach Racing Master!</p>
        </div>
      )}

      {unlockedCount === 0 && (
        <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4 text-center">
          <p className="text-blue-300 text-sm">Start racing to unlock achievements!</p>
        </div>
      )}
    </div>
  );
}
