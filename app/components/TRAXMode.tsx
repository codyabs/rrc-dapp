"use client";

import { useState } from "react";
import { rollRoach, simulateRace, type RoachStats, type GameResult } from "@/app/lib/gameLogic";

type TRAXModeProps = {
  traxBalance: number;
  onBalanceChange: (balance: number) => void;
};

export default function TRAXMode({ traxBalance, onBalanceChange }: TRAXModeProps) {
  const [roachStats, setRoachStats] = useState<RoachStats | null>(null);
  const [raceResult, setRaceResult] = useState<GameResult | null>(null);
  const [isRacing, setIsRacing] = useState(false);
  const [entryAmount, setEntryAmount] = useState(10);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [totalWon, setTotalWon] = useState(0);

  const handleNewRoach = () => {
    const newStats = rollRoach();
    setRoachStats(newStats);
    setRaceResult(null);
  };

  const handleStartRace = async () => {
    if (!roachStats || traxBalance < entryAmount) {
      alert("Insufficient $TRAX balance!");
      return;
    }

    setIsRacing(true);

    // Deduct entry amount
    onBalanceChange(traxBalance - entryAmount);

    // Simulate race
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = simulateRace(roachStats);
    setRaceResult(result);

    // Add winnings
    const totalAmount = entryAmount + result.winnings;
    onBalanceChange(traxBalance - entryAmount + totalAmount);

    setTotalPlayed(totalPlayed + entryAmount);
    setTotalWon(totalWon + result.winnings);
    setIsRacing(false);
  };

  return (
    <div className="space-y-6">
      {/* Title - Premium Style */}
      <div className="text-center mb-10 relative">
        <div className="absolute inset-0 h-32 -z-10 bg-gradient-to-b from-green-600/10 to-transparent blur-3xl" />
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-green-300 to-green-200 bg-clip-text text-transparent mb-3 drop-shadow-lg">
          💰 TRAX MODE
        </h2>
        <p className="text-roach-300 text-lg font-semibold">
          Play with real $TRAX tokens • Higher stakes, higher rewards!
        </p>
      </div>

      {/* Main Game Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Roach Selection Panel - Premium */}
        <div className="bg-gradient-to-br from-black via-roach-900 to-roach-800 rounded-2xl p-7 border-2 border-green-500/30 shadow-2xl hover:shadow-2xl hover:shadow-green-600/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
          {/* Premium Glow Background */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-green-600/20 to-transparent rounded-2xl blur-xl -z-10 opacity-0 hover:opacity-100 transition-opacity" />
          
          <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent mb-5 flex items-center gap-2">
            🪳 YOUR ROACH
          </h3>

          {roachStats ? (
            <div className="space-y-5">
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

              {/* Entry Amount Selector - Premium */}
              <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 rounded-xl p-4 border border-green-700/50 shadow-lg">
                <label className="block text-green-400/80 text-xs font-bold uppercase tracking-widest mb-3">Entry Amount</label>
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setEntryAmount(amount)}
                      disabled={amount > traxBalance}
                      className={`px-3 py-2 rounded-lg font-black text-sm transition-all duration-200 transform ${
                        entryAmount === amount
                          ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/60 scale-105 border border-green-300"
                          : amount > traxBalance
                          ? "bg-roach-800 text-roach-500 cursor-not-allowed opacity-50"
                          : "bg-roach-700 hover:bg-roach-600 text-white hover:scale-105 border border-roach-600/50 hover:border-green-500/50"
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-green-400/90 mt-2 font-bold">
                  💰 Selected: {entryAmount} $TRAX
                </p>
              </div>

              {/* Action Buttons - Premium */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleNewRoach}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-roach-700 to-roach-600 hover:from-roach-600 hover:to-roach-500 text-white rounded-xl font-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-roach-500/50 hover:border-roach-400 uppercase tracking-wider"
                >
                  🔄 Reroll
                </button>
                <button
                  onClick={handleStartRace}
                  disabled={isRacing || traxBalance < entryAmount}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-700 disabled:to-gray-600 text-white rounded-xl font-black transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-2xl hover:shadow-green-500/60 disabled:shadow-lg disabled:shadow-gray-700/20 border border-green-400/50 hover:border-green-300 disabled:border-gray-600/30 uppercase tracking-wider"
                >
                  {isRacing ? "🏁 Racing..." : "🏁 Race"}
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
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black rounded-xl font-black transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-green-500/60 border border-green-400/50 uppercase tracking-wider"
              >
                🎲 Roll Roach
              </button>
            </div>
          )}
        </div>

        {/* Race Result Panel - Premium */}
        <div className="bg-gradient-to-br from-black via-roach-900 to-roach-800 rounded-2xl p-7 border-2 border-green-500/30 shadow-2xl hover:shadow-2xl hover:shadow-green-600/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
          {/* Premium Glow Background */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-green-600/20 to-transparent rounded-2xl blur-xl -z-10 opacity-0 hover:opacity-100 transition-opacity" />
          
          <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent mb-5 flex items-center gap-2">
            🏁 RACE RESULTS
          </h3>

          {raceResult ? (
            <div className="space-y-5">
              {/* Position Badge - Premium */}
              <div className="text-center py-6 bg-gradient-to-b from-roach-900/50 to-transparent rounded-xl border border-roach-700/50">
                <div className="inline-block">
                  {raceResult.position === 1 && (
                    <div className="animate-bounce drop-shadow-[0_0_16px_rgba(34,197,94,0.6)]">
                      <div className="text-8xl mb-3">🏆</div>
                      <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">1ST PLACE!</p>
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

              {/* Payout Summary - Premium */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl p-4 text-center border-2 border-red-600/40 shadow-lg shadow-red-500/20">
                  <p className="text-red-400/70 text-xs font-bold uppercase tracking-widest mb-1">Entry Fee</p>
                  <p className="text-2xl font-black text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">-{entryAmount}</p>
                </div>
                <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-4 text-center border-2 border-green-600/40 shadow-lg shadow-green-500/20">
                  <p className="text-green-400/70 text-xs font-bold uppercase tracking-widest mb-1">Payout</p>
                  <p className="text-2xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
                    +{raceResult.winnings}
                  </p>
                </div>
              </div>

              {/* Net Result - Premium */}
              <div className={`rounded-xl p-5 text-center shadow-xl transition-all border-2 transform ${
                raceResult.winnings > entryAmount
                  ? "bg-gradient-to-r from-green-900/50 via-green-800/30 to-green-900/50 border-green-500/40 shadow-green-500/30"
                  : raceResult.winnings === entryAmount
                  ? "bg-gradient-to-r from-blue-900/50 via-blue-800/30 to-blue-900/50 border-blue-500/40 shadow-blue-500/30"
                  : "bg-gradient-to-r from-red-900/50 via-red-800/30 to-red-900/50 border-red-500/40 shadow-red-500/30"
              }`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                  raceResult.winnings > entryAmount
                    ? "text-green-400"
                    : raceResult.winnings === entryAmount
                    ? "text-blue-400"
                    : "text-red-400"
                }`}>Net Result</p>
                <p className={`text-4xl md:text-5xl font-black drop-shadow-[0_0_12px] ${
                  raceResult.winnings > entryAmount
                    ? "text-green-300 drop-shadow-[0_0_12px_rgba(134,239,172,0.5)]"
                    : raceResult.winnings === entryAmount
                    ? "text-blue-300 drop-shadow-[0_0_12px_rgba(96,165,250,0.5)]"
                    : "text-red-300 drop-shadow-[0_0_12px_rgba(248,113,113,0.5)]"
                }`}>
                  {raceResult.winnings > entryAmount
                    ? `+${raceResult.winnings - entryAmount}`
                    : raceResult.winnings === entryAmount
                    ? "BREAK EVEN"
                    : `-${entryAmount - raceResult.winnings}`}
                </p>
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

      {/* Stats Panel - Premium */}
      <div className="bg-gradient-to-r from-black via-roach-900 to-black rounded-2xl p-7 border-2 border-green-500/30 shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent mb-6">💹 SESSION STATS</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-5 text-center border-2 border-green-500/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            <p className="text-green-400/70 text-xs uppercase font-bold tracking-widest mb-2">Current Balance</p>
            <p className="text-4xl md:text-5xl font-black text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">{traxBalance.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl p-5 text-center border-2 border-red-500/30 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            <p className="text-red-400/70 text-xs uppercase font-bold tracking-widest mb-2">Total Played</p>
            <p className="text-4xl md:text-5xl font-black text-red-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">{totalPlayed}</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-5 text-center border-2 border-green-500/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            <p className="text-green-400/70 text-xs uppercase font-bold tracking-widest mb-2">Total Won</p>
            <p className="text-4xl md:text-5xl font-black text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">{totalWon}</p>
          </div>
          <div className={`rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
              totalWon - totalPlayed >= 0
                ? "bg-gradient-to-br from-green-900/40 to-green-800/20 border-green-500/30 hover:border-green-400 hover:shadow-green-500/30"
                : "bg-gradient-to-br from-red-900/40 to-red-800/20 border-red-500/30 hover:border-red-400 hover:shadow-red-500/30"
            }`}>
            <p className={`text-xs uppercase font-bold tracking-widest mb-2 ${
              totalWon - totalPlayed >= 0
                ? "text-green-400/70"
                : "text-red-400/70"
            }`}>P&L</p>
            <p className={`text-4xl md:text-5xl font-black drop-shadow-[0_0_8px] ${
              totalWon - totalPlayed >= 0
                ? "text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                : "text-red-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
            }`}>
              {totalWon - totalPlayed >= 0 ? "+" : ""}{totalWon - totalPlayed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
