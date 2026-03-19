"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalRaces: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  favoriteRoachSpeed: number;
  favoriteRoachAgility: number;
  favoriteRoachStamina: number;
  totalEarnings: number;
  lastRaceTime: number;
}

const DEFAULT_STATS: Stats = {
  totalRaces: 0,
  totalWins: 0,
  totalLosses: 0,
  winRate: 0,
  favoriteRoachSpeed: 5,
  favoriteRoachAgility: 5,
  favoriteRoachStamina: 5,
  totalEarnings: 0,
  lastRaceTime: 0,
};

export function StatsPanel() {
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load stats from localStorage
      const stored = localStorage.getItem("rrc_stats");
      if (stored) {
        setStats(JSON.parse(stored));
      }
    }
  }, []);

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "Never";
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Main Stats */}
      <div className="bg-gray-800 border-2 border-amber-500 rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4">📊 Race Statistics</h3>
        
        <div className="space-y-4">
          {/* Win Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 font-semibold">Win Rate</span>
              <span className="text-2xl font-bold text-amber-400">
                {stats.winRate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(stats.winRate, 100)}%` }}
              />
            </div>
          </div>

          {/* Total Races */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-sm">Total Races</p>
              <p className="text-2xl font-bold text-white">{stats.totalRaces}</p>
            </div>
            <div className="bg-green-900 bg-opacity-30 rounded-lg p-3 text-center">
              <p className="text-green-400 text-sm">Wins</p>
              <p className="text-2xl font-bold text-green-400">{stats.totalWins}</p>
            </div>
            <div className="bg-red-900 bg-opacity-30 rounded-lg p-3 text-center">
              <p className="text-red-400 text-sm">Losses</p>
              <p className="text-2xl font-bold text-red-400">{stats.totalLosses}</p>
            </div>
          </div>

          {/* Earnings */}
          <div className="bg-amber-900 bg-opacity-30 rounded-lg p-4 border border-amber-500">
            <p className="text-amber-400 text-sm font-semibold mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-amber-400">
              ${stats.totalEarnings.toFixed(2)}
            </p>
          </div>

          {/* Last Race */}
          <div className="text-sm text-gray-400">
            Last race: <span className="text-amber-400">{formatDate(stats.lastRaceTime)}</span>
          </div>
        </div>
      </div>

      {/* Favorite Roach Stats */}
      <div className="bg-gray-800 border-2 border-amber-500 rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4">🪳 Favorite Roach Stats</h3>
        
        <div className="space-y-4">
          {/* Speed */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 font-semibold">Speed</span>
              <span className="text-xl font-bold text-blue-400">{stats.favoriteRoachSpeed}/10</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                style={{ width: `${(stats.favoriteRoachSpeed / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Agility */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 font-semibold">Agility</span>
              <span className="text-xl font-bold text-purple-400">{stats.favoriteRoachAgility}/10</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                style={{ width: `${(stats.favoriteRoachAgility / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Stamina */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 font-semibold">Stamina</span>
              <span className="text-xl font-bold text-orange-400">{stats.favoriteRoachStamina}/10</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
                style={{ width: `${(stats.favoriteRoachStamina / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Total Stats */}
          <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-lg p-4 text-center mt-4">
            <p className="text-amber-400 text-sm font-semibold mb-1">Total Stat Points</p>
            <p className="text-3xl font-bold text-amber-300">
              {stats.favoriteRoachSpeed + stats.favoriteRoachAgility + stats.favoriteRoachStamina}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Tips */}
      <div className="md:col-span-2 bg-blue-900 bg-opacity-20 border border-blue-500 rounded-xl p-4 text-sm text-blue-300">
        💡 <strong>Pro Tip:</strong> Keep track of your favorite roach stats. Higher speed helps in sprints, agility in tight turns, and stamina for endurance. Balance is key!
      </div>
    </div>
  );
}
