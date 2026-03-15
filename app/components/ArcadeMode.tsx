"use client";

export default function ArcadeMode() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-purple-400 mb-2">🎮 Arcade Mode</h2>
        <p className="text-roach-300">
          Fast-paced mini-games coming soon!
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-roach-800 rounded-xl p-12 border border-roach-700 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-2xl font-bold text-purple-300 mb-4">
          Coming Soon!
        </h3>
        <p className="text-roach-300 mb-6 max-w-md mx-auto">
          Arcade mode will feature multiple mini-games and challenges. 
          Stay tuned for updates!
        </p>
        
        <div className="space-y-3 inline-block text-left">
          <div className="flex items-center gap-3 text-roach-300">
            <span>🎯</span>
            <span>Quick Reflex Games</span>
          </div>
          <div className="flex items-center gap-3 text-roach-300">
            <span>⏱️</span>
            <span>Time-based Challenges</span>
          </div>
          <div className="flex items-center gap-3 text-roach-300">
            <span>🏅</span>
            <span>Leaderboard & Rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
