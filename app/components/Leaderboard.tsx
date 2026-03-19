"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  wallet: string;
  winnings: number;
  wins: number;
  totalRaces: number;
  timestamp: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load leaderboard from localStorage
      const stored = localStorage.getItem("rrc_leaderboard");
      if (stored) {
        const data = JSON.parse(stored) as LeaderboardEntry[];
        // Sort by winnings descending and take top 10
        const sorted = data
          .sort((a, b) => b.winnings - a.winnings)
          .slice(0, 10)
          .map((entry, idx) => ({
            ...entry,
            rank: idx + 1,
          }));
        setEntries(sorted);
      }
    }
  }, []);

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const formatWallet = (wallet: string) => {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  };

  if (entries.length === 0) {
    return (
      <div className="bg-gray-800 border-2 border-amber-500 rounded-xl p-6 text-center">
        <p className="text-gray-400">No races completed yet. Be the first to race! 🏁</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border-2 border-amber-500 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4">
        <h2 className="text-2xl font-bold text-white">🏆 Top 10 Leaderboard</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700 border-b border-amber-500">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-amber-400">Rank</th>
              <th className="px-4 py-3 text-left font-bold text-amber-400">Player</th>
              <th className="px-4 py-3 text-center font-bold text-amber-400">Wins</th>
              <th className="px-4 py-3 text-center font-bold text-amber-400">Races</th>
              <th className="px-4 py-3 text-right font-bold text-amber-400">Winnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {entries.map((entry) => (
              <tr
                key={entry.wallet}
                className="hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-4">
                  <span className="text-xl font-bold">
                    {getMedalEmoji(entry.rank)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-white font-semibold">{entry.playerName}</p>
                    <p className="text-gray-400 text-sm">{formatWallet(entry.wallet)}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-white font-semibold">
                  {entry.wins}
                </td>
                <td className="px-4 py-4 text-center text-white">
                  {entry.totalRaces}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-amber-400 font-bold">
                    ${entry.winnings.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-700 p-4 text-center text-gray-300 text-sm">
        💡 Tip: Complete races to climb the leaderboard and compete globally!
      </div>
    </div>
  );
}
