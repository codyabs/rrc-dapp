"use client";

export default function ArcadeMode() {
  return (
    <div className="space-y-8">
      {/* Title - Premium Style */}
      <div className="text-center mb-10 relative">
        <div className="absolute inset-0 h-32 -z-10 bg-gradient-to-b from-purple-600/10 to-transparent blur-3xl" />
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent mb-3 drop-shadow-lg">
          🎮 ARCADE MODE
        </h2>
        <p className="text-roach-300 text-lg font-semibold">
          Fast-paced mini-games coming soon!
        </p>
      </div>

      {/* Coming Soon Card - Premium */}
      <div className="bg-gradient-to-br from-black via-roach-900 to-roach-800 rounded-2xl p-12 border-2 border-purple-500/30 text-center shadow-2xl shadow-purple-600/20 hover:shadow-purple-600/40 transition-all duration-300 relative overflow-hidden">
        {/* Premium Glow Background */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600/20 to-transparent rounded-2xl blur-xl -z-10 opacity-0 hover:opacity-100 transition-opacity" />
        
        <div className="text-8xl mb-6 animate-bounce drop-shadow-[0_0_16px_rgba(168,85,247,0.4)]">🚧</div>
        <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent mb-5">
          COMING SOON!
        </h3>
        <p className="text-roach-300 mb-10 max-w-md mx-auto text-lg font-semibold leading-relaxed">
          Arcade mode will feature multiple mini-games and challenges. 
          Stay tuned for updates!
        </p>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-5 inline-grid">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-6 border-2 border-purple-600/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <span className="text-4xl block mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">🎯</span>
            <span className="font-black text-purple-300 text-lg uppercase tracking-wider">Quick Reflex</span>
            <p className="text-roach-400 text-sm mt-2">Lightning-fast games</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-6 border-2 border-purple-600/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <span className="text-4xl block mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">⏱️</span>
            <span className="font-black text-purple-300 text-lg uppercase tracking-wider">Time Based</span>
            <p className="text-roach-400 text-sm mt-2">Beat the clock</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-6 border-2 border-purple-600/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <span className="text-4xl block mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">🏅</span>
            <span className="font-black text-purple-300 text-lg uppercase tracking-wider">Leaderboard</span>
            <p className="text-roach-400 text-sm mt-2">Compete for glory</p>
          </div>
        </div>
      </div>
    </div>
  );
}
