"use client";

import Image from "next/image";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-roach-900 to-black border-b-2 border-yellow-500/30 shadow-2xl shadow-yellow-600/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo Section */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-pointer group flex-shrink-0"
          >
            {/* Logo Image */}
            <div className="relative h-14 w-14 md:h-16 md:w-16 group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.6)] transition-all duration-300">
              <Image
                src="/Dik04rEcKe7BWnsZhM027.png"
                alt="Roach Racing Club"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            
            {/* Branding Text */}
            <div className="text-left hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-yellow-200 group-hover:to-yellow-100 transition-all duration-300">
                ROACH RACING
              </h1>
              <p className="text-xs md:text-sm text-yellow-500/80 font-bold group-hover:text-yellow-400 transition-colors duration-300">
                CLUB • Abstract L2
              </p>
            </div>
          </button>

          {/* Center Spacer */}
          <div className="flex-grow" />

          {/* Right Section: Balance & Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Balance Display */}
            <div className="hidden md:flex gap-4">
              {/* TRAX Balance */}
              <div className="px-4 py-2 bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-lg border border-green-500/30 hover:border-green-400/60 transition-all duration-200 group/balance">
                <p className="text-green-400/70 text-xs font-bold uppercase tracking-wider group-hover/balance:text-green-300 transition-colors">
                  $TRAX
                </p>
                <p className="text-green-400 font-black text-lg drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
                  {traxBalance.toFixed(0)}
                </p>
              </div>

              {/* USDC Balance */}
              <div className="px-4 py-2 bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-lg border border-blue-500/30 hover:border-blue-400/60 transition-all duration-200 group/balance">
                <p className="text-blue-400/70 text-xs font-bold uppercase tracking-wider group-hover/balance:text-blue-300 transition-colors">
                  $USDC
                </p>
                <p className="text-blue-400 font-black text-lg drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                  {usdcBalance.toFixed(0)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={onShopClick}
              className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold text-sm md:text-base rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 border border-purple-400/50 hover:border-purple-300 whitespace-nowrap"
            >
              🛍️ Shop
            </button>

            <button className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm md:text-base rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 border border-blue-400/50 hover:border-blue-300 whitespace-nowrap">
              👛 Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
