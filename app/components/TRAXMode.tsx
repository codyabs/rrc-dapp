"use client";

import { useState, useEffect } from "react";
import { rollRoach, simulateRace, type RoachStats, type GameResult } from "@/app/lib/gameLogic";
import { recordRaceResult, loadStats, type PlayerStats } from "@/app/lib/statsManager";

const DEFAULT_STATS: PlayerStats = {
  totalRaces: 0,
  totalWins: 0,
  totalLosses: 0,
  winRate: 0,
  favoriteRoachSpeed: 5,
  favoriteRoachAgility: 5,
  favoriteRoachStamina: 5,
  totalEarnings: 0,
  lastRaceTime: 0,
  itemsPurchased: 0,
};

type TRAXModeProps = {
  traxBalance: number;
  onBalanceChange: (balance: number) => void;
};

export default function TRAXMode({ traxBalance, onBalanceChange }: TRAXModeProps) {
  const [roachStats, setRoachStats] = useState<RoachStats | null>(null);
  const [raceResult, setRaceResult] = useState<GameResult | null>(null);
  const [isRacing, setIsRacing] = useState(false);
  const [entryAmount, setEntryAmount] = useState(10);
  const [selectedToken, setSelectedToken] = useState<"TRAX" | "PENGU">("TRAX");
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [totalWon, setTotalWon] = useState(0);
  const [stats, setStats] = useState<PlayerStats>(DEFAULT_STATS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStats(loadStats());
    }
  }, []);

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

    // Track the race in stats
    const normalizedSpeed = Math.round((result.stats.speed / 100) * 10);
    const normalizedAgility = Math.round((result.stats.agility / 100) * 10);
    const normalizedStamina = Math.round((result.stats.stamina / 100) * 10);
    
    const updatedStats = recordRaceResult(
      result.position,
      result.winnings,
      normalizedSpeed,
      normalizedAgility,
      normalizedStamina
    );
    setStats(updatedStats);

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
      <div className="text-center">
        <h2 className="text-4xl font-bold text-green-400 mb-2">💰 TRAX Mode</h2>
        <p className="text-roach-300">
          Play with real $TRAX tokens. Higher stakes, higher rewards!
        </p>
      </div>

      {/* Token Selector */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedToken("TRAX")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            selectedToken === "TRAX"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-roach-700 text-roach-50 hover:bg-roach-600"
          }`}
        >
          💰 $TRAX
        </button>
        <button
          onClick={() => setSelectedToken("PENGU")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            selectedToken === "PENGU"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-roach-700 text-roach-50 hover:bg-roach-600"
          }`}
        >
          🐧 $PENGU
        </button>
      </div>

      {/* Main Game Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Roach Selection Panel */}
        <div className="bg-roach-800 rounded-xl p-6 border border-roach-700">
          <h3 className="text-xl font-bold text-green-400 mb-4">Your Roach</h3>

          {roachStats ? (
            <div className="space-y-4">
              {/* Stats Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-roach-300">Speed</span>
                    <span className="font-bold">{roachStats.speed.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-roach-700 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
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
                      className="bg-orange-500 h-3 rounded-full"
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
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${roachStats.stamina}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Entry Amount Selector */}
              <div className="bg-roach-700 rounded-lg p-4">
                <label className="block text-roach-300 text-sm mb-3">Entry Amount</label>
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setEntryAmount(amount)}
                      disabled={amount > traxBalance}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                        entryAmount === amount
                          ? "bg-green-600 text-white"
                          : amount > traxBalance
                          ? "bg-roach-600 text-roach-400 cursor-not-allowed"
                          : "bg-roach-600 hover:bg-roach-500 text-white"
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-roach-300 mt-2">
                  Selected: {entryAmount} $TRAX
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleNewRoach}
                  className="flex-1 px-4 py-2 bg-roach-700 hover:bg-roach-600 text-white rounded-lg font-semibold transition-all"
                >
                  🔄 Reroll
                </button>
                <button
                  onClick={handleStartRace}
                  disabled={isRacing || traxBalance < entryAmount}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white rounded-lg font-bold transition-all"
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
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all"
              >
                🎲 Roll Roach
              </button>
            </div>
          )}
        </div>


      </div>

      {/* Race Result Notification */}
      {raceResult && (
        <div className="bg-roach-800 rounded-xl p-6 border border-roach-700 mb-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Race Result</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              {raceResult.position === 1 && <div className="text-4xl mb-2">🏆</div>}
              {raceResult.position === 2 && <div className="text-4xl mb-2">🥈</div>}
              {raceResult.position === 3 && <div className="text-4xl mb-2">🥉</div>}
              {raceResult.position >= 4 && <div className="text-4xl mb-2">😅</div>}
              <p className="text-roach-300">Position</p>
              <p className="text-2xl font-bold text-white">{raceResult.position}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-2">💰</p>
              <p className="text-roach-300">Winnings</p>
              <p className={`text-2xl font-bold ${
                raceResult.winnings > entryAmount ? "text-green-400" : "text-red-400"
              }`}>
                {raceResult.winnings > entryAmount ? "+" : ""}{raceResult.winnings - entryAmount}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-2">📊</p>
              <p className="text-roach-300">Win Rate</p>
              <p className="text-2xl font-bold text-purple-400">{stats.winRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Panel */}
      <div className="bg-roach-800 rounded-xl p-6 border border-roach-700">
        <h3 className="text-xl font-bold text-green-400 mb-4">Session Stats</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Current Balance</p>
            <p className="text-3xl font-bold text-green-400">{traxBalance.toFixed(0)}</p>
          </div>
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Total Played</p>
            <p className="text-3xl font-bold text-red-400">{totalPlayed}</p>
          </div>
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">Total Won</p>
            <p className="text-3xl font-bold text-green-400">{totalWon}</p>
          </div>
          <div className="bg-roach-700 rounded-lg p-4 text-center">
            <p className="text-roach-300 text-sm">P&L</p>
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
