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
      {/* Title - Premium Style */}
      <div className="text-center mb-10 relative">
        <div className="absolute inset-0 h-32 -z-10 bg-gradient-to-b from-yellow-600/10 to-transparent blur-3xl" />
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent mb-3 drop-shadow-lg">
          🪳 MTGN MODE
        </h2>
        <p className="text-roach-300 text-lg font-semibold">
          Roll your roach and race against AI opponents • No tokens required!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Roach Stats Panel - Premium */}
        <div className="bg-gradient-to-br from-black via-roach-900 to-roach-800 rounded-2xl p-7 border-2 border-yellow-500/30 shadow-2xl hover:shadow-2xl hover:shadow-yellow-600/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
          {/* Premium Glow Background */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-600/20 to-transparent rounded-2xl blur-xl -z-10 opacity-0 hover:opacity-100 transition-opacity" />
          
          <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-5 flex items-center gap-2">
            🪳 YOUR ROACH
          </h3>
          
          {roachStats ? (
            <div className="space-y-4">
              {/* Stats Display - Premium */}
              <div className="space-y-5 bg-roach-900/40 rounded-xl p-4 border border-roach-700/50">
                <div>
                  <div className="flex justify-between mb-2 items-center">
                    <span className="text-red-400 font-black uppercase text-sm tracking-wider">⚡ Speed</span>
                    <span className="font-black text-red-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">{roachStats.speed.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-5 overflow-hidden shadow-inner border border-red-900/50">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-5 rounded-full transition-all duration-300 shadow-lg shadow-red-500/70"
                      style={{ width: `${roachStats.speed}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 items-center">
                    <span className="text-orange-400 font-black uppercase text-sm tracking-wider">🤸 Agility</span>
                    <span className="font-black text-orange-300 drop-shadow-[0_0_8px_rgba(234,88,12,0.4)]">{roachStats.agility.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-5 overflow-hidden shadow-inner border border-orange-900/50">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-orange-500 h-5 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/70"
                      style={{ width: `${roachStats.agility}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 items-center">
                    <span className="text-green-400 font-black uppercase text-sm tracking-wider">💪 Stamina</span>
                    <span className="font-black text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">{roachStats.stamina.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-5 overflow-hidden shadow-inner border border-green-900/50">
                    <div
                      className="bg-gradient-to-r from-green-600 to-green-500 h-5 rounded-full transition-all duration-300 shadow-lg shadow-green-500/70"
                      style={{ width: `${roachStats.stamina}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons - Premium */}
              <div className="flex gap-3 pt-5">
                <button
                  onClick={handleNewRoach}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-roach-700 to-roach-600 hover:from-roach-600 hover:to-roach-500 text-white rounded-xl font-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-roach-500/50 hover:border-roach-400 uppercase tracking-wider"
                >
                  🔄 Reroll
                </button>
                <button
                  onClick={handleStartRace}
                  disabled={isRacing}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-700 disabled:to-gray-600 text-white rounded-xl font-black transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-2xl hover:shadow-green-500/60 disabled:shadow-lg disabled:shadow-gray-700/20 border border-green-400/50 hover:border-green-300 disabled:border-gray-600/30 uppercase tracking-wider"
                >
                  {isRacing ? "🏁 Racing..." : "🏁 Start Race"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
              <div className="text-5xl mb-2">🎲</div>
              <p className="text-roach-300 text-lg font-semibold">No roach rolled yet</p>
              <p className="text-roach-400 text-sm">Roll your roach to begin racing!</p>
              <button
                onClick={handleNewRoach}
                className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black rounded-xl font-black transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/60 border border-yellow-400/50 uppercase tracking-wider"
              >
                🎲 Roll Roach
              </button>
            </div>
          )}
        </div>

        {/* Race Result Panel - Premium */}
        <div className="bg-gradient-to-br from-black via-roach-900 to-roach-800 rounded-2xl p-7 border-2 border-yellow-500/30 shadow-2xl hover:shadow-2xl hover:shadow-yellow-600/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
          {/* Premium Glow Background */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-600/20 to-transparent rounded-2xl blur-xl -z-10 opacity-0 hover:opacity-100 transition-opacity" />
          
          <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-5 flex items-center gap-2">
            🏁 RACE RESULTS
          </h3>
          
          {raceResult ? (
            <div className="space-y-5">
              {/* Position Badge - Premium */}
              <div className="text-center py-6 bg-gradient-to-b from-roach-900/50 to-transparent rounded-xl border border-roach-700/50">
                <div className="inline-block">
                  {raceResult.position === 1 && (
                    <div className="animate-bounce drop-shadow-[0_0_16px_rgba(250,204,21,0.6)]">
                      <div className="text-8xl mb-3">🏆</div>
                      <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">1ST PLACE!</p>
                    </div>
                  )}
                  {raceResult.position === 2 && (
                    <div className="animate-pulse">
                      <div className="text-7xl mb-3">🥈</div>
                      <p className="text-2xl md:text-3xl font-black text-gray-300">2ND PLACE</p>
                    </div>
                  )}
                  {raceResult.position === 3 && (
                    <div className="animate-pulse">
                      <div className="text-7xl mb-3">🥉</div>
                      <p className="text-2xl md:text-3xl font-black text-amber-600">3RD PLACE</p>
                    </div>
                  )}
                  {raceResult.position >= 4 && (
                    <div>
                      <div className="text-6xl mb-3">😅</div>
                      <p className="text-xl md:text-2xl font-black text-roach-300">
                        {raceResult.position === 4 ? "4TH PLACE" : "5TH PLACE"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payout - Premium */}
              <div className={`rounded-xl p-5 text-center shadow-xl transition-all border-2 transform ${
                raceResult.winnings > 0 
                  ? 'bg-gradient-to-r from-green-900/50 via-green-800/30 to-green-900/50 border-green-500/40 shadow-green-500/30' 
                  : 'bg-gradient-to-r from-roach-800/50 to-roach-700/50 border-roach-600/40'
              }`}>
                <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${raceResult.winnings > 0 ? 'text-green-400' : 'text-roach-400'}`}>Race Payout</p>
                <p className={`text-4xl md:text-5xl font-black drop-shadow-[0_0_12px] transition-all ${
                  raceResult.winnings > 0 
                    ? 'text-green-300 drop-shadow-[0_0_12px_rgba(134,239,172,0.5)] animate-pulse' 
                    : 'text-roach-400'
                }`}>
                  {raceResult.winnings === 0 ? "0" : `+${raceResult.winnings}`}
                </p>
              </div>

              {/* Stats - Premium */}
              <div className="bg-gradient-to-r from-roach-800/50 to-roach-750/50 rounded-xl p-4 shadow-lg border border-roach-700/50">
                <p className="text-roach-300 text-xs font-bold uppercase tracking-widest mb-3">Used Stats</p>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between items-center"><span className="text-red-400 font-bold">⚡ Speed:</span> <span className="font-black text-red-300 drop-shadow-[0_0_4px_rgba(239,68,68,0.3)]">{raceResult.stats.speed.toFixed(1)}</span></p>
                  <p className="flex justify-between items-center"><span className="text-orange-400 font-bold">🤸 Agility:</span> <span className="font-black text-orange-300 drop-shadow-[0_0_4px_rgba(234,88,12,0.3)]">{raceResult.stats.agility.toFixed(1)}</span></p>
                  <p className="flex justify-between items-center"><span className="text-green-400 font-bold">💪 Stamina:</span> <span className="font-black text-green-300 drop-shadow-[0_0_4px_rgba(34,197,94,0.3)]">{raceResult.stats.stamina.toFixed(1)}</span></p>
                </div>
              </div>

              <button
                onClick={handleNewRoach}
                className="w-full px-4 py-3 bg-gradient-to-r from-roach-700 to-roach-600 hover:from-roach-600 hover:to-roach-500 text-white rounded-xl font-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-roach-500/50 hover:border-roach-400 uppercase tracking-wider"
              >
                🔄 Next Race
              </button>
            </div>
          ) : (
            <div className="text-center py-12 flex flex-col items-center justify-center text-roach-300">
              <div className="text-4xl mb-3">🏁</div>
              <p className="font-semibold">Roll a roach and start a race</p>
              <p className="text-sm text-roach-400 mt-1">Results will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary - Premium */}
      <div className="bg-gradient-to-r from-black via-roach-900 to-black rounded-2xl p-7 border-2 border-yellow-500/30 shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6">📊 SESSION STATS</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-xl p-5 text-center border-2 border-blue-500/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <p className="text-blue-400/70 text-xs uppercase font-bold tracking-widest mb-2">Total Races</p>
            <p className="text-4xl md:text-5xl font-black text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">{raceCount}</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-5 text-center border-2 border-green-500/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <p className="text-green-400/70 text-xs uppercase font-bold tracking-widest mb-2">Total Winnings</p>
            <p className="text-4xl md:text-5xl font-black text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">{totalWinnings}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 rounded-xl p-5 text-center border-2 border-yellow-500/30 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <p className="text-yellow-400/70 text-xs uppercase font-bold tracking-widest mb-2">Avg Payout</p>
            <p className="text-4xl md:text-5xl font-black text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
              {raceCount > 0 ? (totalWinnings / raceCount).toFixed(1) : "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
