"use client";

import { useState } from "react";
import { rollRoach, simulateRace, type RoachStats, type GameResult } from "@/app/lib/gameLogic";

export default function MTGNMode() {
  const [roachStats, setRoachStats] = useState<RoachStats | null>(null);
  const [raceResult, setRaceResult] = useState<GameResult | null>(null);
  const [isRacing, setIsRacing] = useState(false);
  const [totalWinnings, setTotalWinnings] = useState(12);
  const [raceCount, setRaceCount] = useState(15);

  // Roll a new roach
  const handleNewRoach = () => {
    const newStats = rollRoach();
    setRoachStats(newStats);
    setRaceResult(null);
  };

  // Start race
  const handleStartRace = async () => {
    if (!roachStats) return;
    
    setIsRacing(true);
    
    // Simulate race animation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const result = simulateRace(roachStats);
    setRaceResult(result);
    setTotalWinnings(totalWinnings + result.winnings);
    setRaceCount(raceCount + 1);
    
    setIsRacing(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-2">🪳 MTGN Mode</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Roach Stats Panel */}
        <div className="bg-roach-800 rounded-xl p-6 border border-roach-700">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Your Roach</h3>
          
          {roachStats ? (
            <div className="space-y-4">
              {/* Stats Display */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-roach-300">Speed</span>
                    <span className="font-bold">{roachStats.speed.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all"
                      style={{ width: `${roachStats.speed}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-roach-300">Agility</span>
                    <span className="font-bold">{roachStats.agility.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-3">
                    <div
                      className="bg-orange-500 h-3 rounded-full transition-all"
                      style={{ width: `${roachStats.agility}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-roach-300">Stamina</span>
                    <span className="font-bold">{roachStats.stamina.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${roachStats.stamina}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleNewRoach}
                  className="flex-1 px-4 py-2 bg-roach-700 hover:bg-roach-600 text-white rounded-lg font-semibold transition-all"
                >
                  🔄 Reroll
                </button>
                <button
                  onClick={handleStartRace}
                  disabled={isRacing}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white rounded-lg font-bold transition-all"
                >
                  {isRacing ? "🏁 Racing..." : "🏁 Start Race"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-roach-300 mb-4">No roach rolled yet</p>
              <button
                onClick={handleNewRoach}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold transition-all"
              >
                🔄 Reroll Roach
              </button>
            </div>
          )}
        </div>

        {/* Race Result Panel */}
        <div className="bg-roach-800 rounded-xl p-6 border border-roach-700">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Race Results</h3>
          
          {raceResult ? (
            <div className="space-y-4">
              {/* Position Badge */}
              <div className="text-center">
                <div className="inline-block">
                  {raceResult.position === 1 && (
                    <>
                      <div className="text-6xl mb-2">🏆</div>
                      <p className="text-3xl font-bold text-yellow-400">1st Place!</p>
                    </>
                  )}
                  {raceResult.position === 2 && (
                    <>
                      <div className="text-6xl mb-2">🥈</div>
                      <p className="text-2xl font-bold text-gray-300">2nd Place</p>
                    </>
                  )}
                  {raceResult.position === 3 && (
                    <>
                      <div className="text-6xl mb-2">🥉</div>
                      <p className="text-2xl font-bold text-amber-600">3rd Place</p>
                    </>
                  )}
                  {raceResult.position >= 4 && (
                    <>
                      <div className="text-5xl mb-2">😅</div>
                      <p className="text-xl font-bold text-roach-300">
                        {raceResult.position === 4 ? "4th Place" : "5th Place"}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Payout */}
              <div className="bg-roach-700 rounded-lg p-4 text-center">
                <p className="text-roach-300 text-sm">Race Payout</p>
                <p className="text-3xl font-bold text-green-400">
                  {raceResult.winnings === 0 ? "0" : `+${raceResult.winnings}`}
                </p>
              </div>

              {/* Stats */}
              <div className="bg-roach-700 rounded-lg p-4">
                <p className="text-roach-300 text-sm mb-2">Used Stats</p>
                <div className="space-y-1 text-sm">
                  <p>Speed: {raceResult.stats.speed.toFixed(1)}</p>
                  <p>Agility: {raceResult.stats.agility.toFixed(1)}</p>
                  <p>Stamina: {raceResult.stats.stamina.toFixed(1)}</p>
                </div>
              </div>

              <button
                onClick={handleNewRoach}
                className="w-full px-4 py-2 bg-roach-700 hover:bg-roach-600 text-white rounded-lg font-semibold transition-all"
              >
                🔄 Next Race
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-roach-300">
              <p>Start a race to see results here</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-roach-800 rounded-xl p-6 border border-roach-700">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Session Stats</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Total Races</p>
            <p className="text-3xl font-bold text-blue-400">{raceCount}</p>
          </div>
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Total Winnings</p>
            <p className="text-3xl font-bold text-green-400">{totalWinnings}</p>
          </div>
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Avg Payout</p>
            <p className="text-3xl font-bold text-yellow-400">5</p>
          </div>
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Win Rate</p>
            <p className="text-3xl font-bold text-purple-400">80%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
