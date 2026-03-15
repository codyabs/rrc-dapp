"use client";

export default function ArcadeMode() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-2">
          🎮 Arcade Mode
        </h2>
        <p className="text-roach-300">
          Fast-paced mini-games coming soon!
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-gradient-to-br from-roach-800 via-roach-850 to-roach-900 rounded-xl p-12 border border-purple-600/30 text-center shadow-2xl shadow-purple-500/10 hover:shadow-purple-600/20 transition-all duration-300">
        <div className="text-7xl mb-4 animate-bounce">🚧</div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-4">
          Coming Soon!
        </h3>
        <p className="text-roach-300 mb-8 max-w-md mx-auto text-lg">
          Arcade mode will feature multiple mini-games and challenges. 
          Stay tuned for updates!
        </p>
        
        <div className="space-y-4 inline-block text-left bg-roach-900/50 rounded-lg p-6 border border-purple-600/20">
          <div className="flex items-center gap-3 text-roach-200 hover:text-purple-300 transition-colors">
            <span className="text-2xl">🎯</span>
            <span className="font-semibold">Quick Reflex Games</span>
          </div>
          <div className="flex items-center gap-3 text-roach-200 hover:text-purple-300 transition-colors">
            <span className="text-2xl">⏱️</span>
            <span className="font-semibold">Time-based Challenges</span>
          </div>
          <div className="flex items-center gap-3 text-roach-200 hover:text-purple-300 transition-colors">
            <span className="text-2xl">🏅</span>
            <span className="font-semibold">Leaderboard & Rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
