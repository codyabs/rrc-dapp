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
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">
          💰 TRAX Mode
        </h2>
        <p className="text-roach-300">
          Play with real $TRAX tokens. Higher stakes, higher rewards!
        </p>
      </div>

      {/* Main Game Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Roach Selection Panel */}
        <div className="bg-gradient-to-br from-roach-800 to-roach-850 rounded-xl p-6 border border-green-600/30 shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4">Your Roach</h3>

          {roachStats ? (
            <div className="space-y-4">
              {/* Stats Bars */}
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

              {/* Entry Amount Selector */}
              <div className="bg-gradient-to-r from-roach-700 to-roach-750 rounded-lg p-4 shadow-lg">
                <label className="block text-roach-300 text-sm font-semibold mb-3">Entry Amount</label>
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setEntryAmount(amount)}
                      disabled={amount > traxBalance}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all transform ${
                        entryAmount === amount
                          ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/50 scale-105"
                          : amount > traxBalance
                          ? "bg-roach-700 text-roach-400 cursor-not-allowed"
                          : "bg-roach-600 hover:bg-roach-500 text-white hover:scale-105"
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-green-400/80 mt-2 font-semibold">
                  Selected: {entryAmount} $TRAX
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleNewRoach}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-roach-700 to-roach-600 hover:from-roach-600 hover:to-roach-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🔄 Reroll
                </button>
                <button
                  onClick={handleStartRace}
                  disabled={isRacing || traxBalance < entryAmount}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-700 disabled:to-gray-600 text-white rounded-lg font-bold transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl hover:shadow-green-500/50 disabled:shadow-none"
                >
                  {isRacing ? "🏁 Racing..." : "🏁 Race"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-roach-300 mb-4">No roach rolled yet</p>
              <button
                onClick={handleNewRoach}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-green-500/50"
              >
                🎲 Roll Roach
              </button>
            </div>
          )}
        </div>

        {/* Race Result Panel */}
        <div className="bg-gradient-to-br from-roach-800 to-roach-850 rounded-xl p-6 border border-green-600/30 shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4">Race Results</h3>

          {raceResult ? (
            <div className="space-y-4">
              {/* Result Badge */}
              <div className="text-center py-4">
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

              {/* Payout Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 rounded-lg p-3 text-center border border-red-700/30 shadow-lg shadow-red-500/20">
                  <p className="text-roach-300 text-xs font-semibold">Entry Fee</p>
                  <p className="text-xl font-bold text-red-400">-{entryAmount}</p>
                </div>
                <div className="bg-gradient-to-br from-green-900/40 to-green-800/30 rounded-lg p-3 text-center border border-green-700/30 shadow-lg shadow-green-500/20">
                  <p className="text-roach-300 text-xs font-semibold">Payout</p>
                  <p className="text-xl font-bold text-green-400">
                    +{raceResult.winnings}
                  </p>
                </div>
              </div>

              {/* Net Result */}
              <div className={`rounded-lg p-4 text-center shadow-lg transform transition-all ${
                raceResult.winnings > entryAmount
                  ? "bg-gradient-to-r from-green-900/50 to-green-800/40 border border-green-600/30 shadow-green-500/30"
                  : raceResult.winnings === entryAmount
                  ? "bg-gradient-to-r from-blue-900/50 to-blue-800/40 border border-blue-600/30 shadow-blue-500/30"
                  : "bg-gradient-to-r from-red-900/50 to-red-800/40 border border-red-600/30 shadow-red-500/30"
              }`}>
                <p className="text-roach-300 text-sm font-semibold">Net Result</p>
                <p className={`text-3xl font-bold ${
                  raceResult.winnings > entryAmount
                    ? "text-green-400"
                    : raceResult.winnings === entryAmount
                    ? "text-blue-400"
                    : "text-red-400"
                }`}>
                  {raceResult.winnings > entryAmount
                    ? `+${raceResult.winnings - entryAmount}`
                    : raceResult.winnings === entryAmount
                    ? "Break Even"
                    : `-${entryAmount - raceResult.winnings}`}
                </p>
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
              <p>Roll a roach and race to see results here</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Panel */}
      <div className="bg-gradient-to-r from-roach-800 to-roach-850 rounded-xl p-6 border border-green-600/30 shadow-xl">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4">Session Stats</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-roach-700 to-roach-750 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-green-500/20 transition-all transform hover:-translate-y-1 shadow-lg">
            <p className="text-roach-300 text-sm font-semibold">Current Balance</p>
            <p className="text-3xl font-bold text-green-400">{traxBalance.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-roach-700 to-roach-750 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-red-500/20 transition-all transform hover:-translate-y-1 shadow-lg">
            <p className="text-roach-300 text-sm font-semibold">Total Played</p>
            <p className="text-3xl font-bold text-red-400">{totalPlayed}</p>
          </div>
          <div className="bg-gradient-to-br from-roach-700 to-roach-750 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-green-500/20 transition-all transform hover:-translate-y-1 shadow-lg">
            <p className="text-roach-300 text-sm font-semibold">Total Won</p>
            <p className="text-3xl font-bold text-green-400">{totalWon}</p>
          </div>
          <div className={`rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${
              totalWon - totalPlayed >= 0
                ? "bg-gradient-to-br from-green-700/30 to-green-800/20 border border-green-600/30"
                : "bg-gradient-to-br from-red-700/30 to-red-800/20 border border-red-600/30"
            }`}>
            <p className="text-roach-300 text-sm font-semibold">P&L</p>
            <p className={`text-3xl font-bold ${
              totalWon - totalPlayed >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}>
              {totalWon - totalPlayed >= 0 ? "+" : ""}{totalWon - totalPlayed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
