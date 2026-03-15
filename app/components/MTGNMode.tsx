"use client";

import { useState } from "react";
import { rollRoach, simulateRace, type RoachStats, type GameResult } from "@/app/lib/gameLogic";

export default function MTGNMode() {
  const [roachStats, setRoachStats] = useState<RoachStats | null>(null);
  const [raceResult, setRaceResult] = useState<GameResult | null>(null);
  const [isRacing, setIsRacing] = useState(false);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [raceCount, setRaceCount] = useState(0);

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
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-2">
          🪳 MTGN Mode
        </h2>
        <p className="text-roach-300">
          Roll your roach and race against AI opponents. No tokens required!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Roach Stats Panel */}
        <div className="bg-gradient-to-br from-roach-800 to-roach-850 rounded-xl p-6 border border-roach-600 shadow-xl hover:shadow-2xl hover:shadow-yellow-600/20 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-4">Your Roach</h3>
          
          {roachStats ? (
            <div className="space-y-4">
              {/* Stats Display */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-roach-300 font-semibold">⚡ Speed</span>
                    <span className="font-bold text-red-400">{roachStats.speed.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-4 rounded-full transition-all duration-300 shadow-lg shadow-red-500/50"
                      style={{ width: `${roachStats.speed}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-roach-300 font-semibold">🤸 Agility</span>
                    <span className="font-bold text-orange-400">{roachStats.agility.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-orange-500 h-4 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/50"
                      style={{ width: `${roachStats.agility}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-roach-300 font-semibold">💪 Stamina</span>
                    <span className="font-bold text-green-400">{roachStats.stamina.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-green-600 to-green-500 h-4 rounded-full transition-all duration-300 shadow-lg shadow-green-500/50"
                      style={{ width: `${roachStats.stamina}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleNewRoach}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-roach-700 to-roach-600 hover:from-roach-600 hover:to-roach-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🔄 Reroll
                </button>
                <button
                  onClick={handleStartRace}
                  disabled={isRacing}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-500 text-white rounded-lg font-bold transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl hover:shadow-green-500/50 disabled:shadow-none"
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
                className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-yellow-500/50"
              >
                🎲 Roll Roach
              </button>
            </div>
          )}
        </div>

        {/* Race Result Panel */}
        <div className="bg-gradient-to-br from-roach-800 to-roach-850 rounded-xl p-6 border border-roach-600 shadow-xl hover:shadow-2xl hover:shadow-yellow-600/20 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-4">Race Results</h3>
          
          {raceResult ? (
            <div className="space-y-4">
              {/* Position Badge */}
              <div className="text-center py-4">
                <div className="inline-block">
                  {raceResult.position === 1 && (
                    <div className="animate-bounce">
                      <div className="text-7xl mb-2">🏆</div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">1st Place!</p>
                    </div>
                  )}
                  {raceResult.position === 2 && (
                    <div className="animate-pulse">
                      <div className="text-6xl mb-2">🥈</div>
                      <p className="text-2xl font-bold text-gray-300">2nd Place</p>
                    </div>
                  )}
                  {raceResult.position === 3 && (
                    <div className="animate-pulse">
                      <div className="text-6xl mb-2">🥉</div>
                      <p className="text-2xl font-bold text-amber-600">3rd Place</p>
                    </div>
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
              <div className={`${raceResult.winnings > 0 ? 'bg-gradient-to-r from-green-700 to-green-800' : 'bg-roach-700'} rounded-lg p-4 text-center shadow-lg ${raceResult.winnings > 0 ? 'shadow-green-500/50' : ''} transform transition-all`}>
                <p className="text-roach-300 text-sm">Race Payout</p>
                <p className={`text-3xl font-bold ${raceResult.winnings > 0 ? 'text-green-300 animate-pulse' : 'text-roach-300'}`}>
                  {raceResult.winnings === 0 ? "0" : `+${raceResult.winnings}`}
                </p>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-roach-700 to-roach-750 rounded-lg p-4 shadow-lg">
                <p className="text-roach-300 text-sm font-semibold mb-3">Used Stats</p>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between"><span>⚡ Speed:</span> <span className="font-bold text-red-400">{raceResult.stats.speed.toFixed(1)}</span></p>
                  <p className="flex justify-between"><span>🤸 Agility:</span> <span className="font-bold text-orange-400">{raceResult.stats.agility.toFixed(1)}</span></p>
                  <p className="flex justify-between"><span>💪 Stamina:</span> <span className="font-bold text-green-400">{raceResult.stats.stamina.toFixed(1)}</span></p>
                </div>
              </div>

              <button
                onClick={handleNewRoach}
                className="w-full px-4 py-3 bg-gradient-to-r from-roach-700 to-roach-600 hover:from-roach-600 hover:to-roach-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🔄 Next Race
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-roach-300">
              <p>Roll a roach and start a race to see results here</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-gradient-to-r from-roach-800 to-roach-850 rounded-xl p-6 border border-roach-600 shadow-xl">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-4">Session Stats</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-roach-700 to-roach-750 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1">
            <p className="text-roach-300 text-sm">Total Races</p>
            <p className="text-3xl font-bold text-blue-400">{raceCount}</p>
          </div>
          <div className="bg-gradient-to-br from-roach-700 to-roach-750 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-green-500/20 transition-all transform hover:-translate-y-1">
            <p className="text-roach-300 text-sm">Total Winnings</p>
            <p className="text-3xl font-bold text-green-400">{totalWinnings}</p>
          </div>
          <div className="bg-gradient-to-br from-roach-700 to-roach-750 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-1">
            <p className="text-roach-300 text-sm">Avg Payout</p>
            <p className="text-3xl font-bold text-yellow-400">
              {raceCount > 0 ? (totalWinnings / raceCount).toFixed(1) : "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
