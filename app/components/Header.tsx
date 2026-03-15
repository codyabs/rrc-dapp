"use client";

type HeaderProps = {
  gameMode?: "mtgn" | "trax" | "arcade";
  traxBalance: number;
  usdcBalance: number;
  onShopClick: () => void;
};

export default function Header({
  traxBalance,
  usdcBalance,
  onShopClick,
}: HeaderProps) {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-roach-800 via-roach-750 to-roach-800 rounded-xl p-6 shadow-2xl shadow-yellow-600/20 border border-yellow-600/30">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 cursor-pointer group"
        >
          <span className="text-5xl group-hover:animate-bounce">🪳</span>
          <div className="text-left">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-yellow-200 transition-all">
              Roach Racing Club
            </h1>
            <p className="text-sm text-yellow-600/80 group-hover:text-yellow-500 transition-colors">
              Play on Abstract • Chain 2741
            </p>
          </div>
        </button>

        {/* Balance Info */}
        <div className="flex gap-6 items-center">
          <div className="text-center bg-roach-700/50 rounded-lg px-4 py-3 hover:bg-roach-700 transition-colors">
            <p className="text-roach-300 text-sm">$TRAX Balance</p>
            <p className="text-2xl font-bold text-green-400">
              {traxBalance.toFixed(2)}
            </p>
          </div>
          <div className="text-center bg-roach-700/50 rounded-lg px-4 py-3 hover:bg-roach-700 transition-colors">
            <p className="text-roach-300 text-sm">$USDC Balance</p>
            <p className="text-2xl font-bold text-blue-400">
              {usdcBalance.toFixed(2)}
            </p>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onShopClick}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
          >
            🛍️ Shop
          </button>
          <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/50">
            👛 Wallet
          </button>
        </div>
      </div>
    </header>
  );
}
