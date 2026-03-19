"use client";

import { useState } from "react";

type SwapWidgetProps = {
  usdcBalance: number;
  traxBalance: number;
  onSwap?: (fromToken: string, toToken: string, amount: number) => void;
};

export function SwapWidget({ usdcBalance, traxBalance, onSwap }: SwapWidgetProps) {
  const [swapMode, setSwapMode] = useState<"usdc-to-trax" | "trax-to-usdc">("usdc-to-trax");
  const [inputAmount, setInputAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);

  // Conversion rate: 1 USDC = 1.2 TRAX (configurable)
  const CONVERSION_RATE = 1.2;

  const getOutputAmount = (amount: number) => {
    if (swapMode === "usdc-to-trax") {
      return amount * CONVERSION_RATE;
    } else {
      return amount / CONVERSION_RATE;
    }
  };

  const outputAmount = inputAmount ? getOutputAmount(parseFloat(inputAmount)) : 0;
  const isValid = inputAmount && parseFloat(inputAmount) > 0;
  const isValidBalance =
    swapMode === "usdc-to-trax"
      ? parseFloat(inputAmount) <= usdcBalance
      : parseFloat(inputAmount) <= traxBalance;

  const handleSwap = async () => {
    if (!isValid || !isValidBalance) return;

    setIsSwapping(true);
    try {
      const amount = parseFloat(inputAmount);
      const fromToken = swapMode === "usdc-to-trax" ? "USDC" : "TRAX";
      const toToken = swapMode === "usdc-to-trax" ? "TRAX" : "USDC";
      
      if (onSwap) {
        onSwap(fromToken, toToken, amount);
      }

      // Simulate swap delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setInputAmount("");
      setIsSwapping(false);
    } catch (error) {
      console.error("Swap failed:", error);
      setIsSwapping(false);
    }
  };

  const toggleSwapMode = () => {
    setSwapMode(
      swapMode === "usdc-to-trax" ? "trax-to-usdc" : "usdc-to-trax"
    );
    setInputAmount("");
  };

  const fromToken = swapMode === "usdc-to-trax" ? "USDC" : "TRAX";
  const toToken = swapMode === "usdc-to-trax" ? "TRAX" : "USDC";
  const fromBalance = swapMode === "usdc-to-trax" ? usdcBalance : traxBalance;

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Swap</h3>
        <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">
          1 {fromToken} = {(swapMode === "usdc-to-trax" ? CONVERSION_RATE : (1 / CONVERSION_RATE)).toFixed(2)} {toToken}
        </span>
      </div>

      {/* From Token */}
      <div className="mb-4 space-y-2">
        <label className="text-sm text-slate-300">From</label>
        <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
          <div className="flex justify-between mb-2">
            <span className="text-xl font-bold text-white">{fromToken}</span>
            <span className="text-xs text-slate-400">
              Balance: {fromBalance.toFixed(2)}
            </span>
          </div>
          <input
            type="number"
            placeholder="0.00"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            disabled={isSwapping}
            className="w-full bg-transparent text-white text-lg font-semibold outline-none placeholder-slate-500 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={toggleSwapMode}
          disabled={isSwapping}
          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full border border-slate-600 text-slate-300 hover:text-white transition-all disabled:opacity-50"
          title="Switch swap direction"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        </button>
      </div>

      {/* To Token */}
      <div className="mb-4 space-y-2">
        <label className="text-sm text-slate-300">To</label>
        <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
          <div className="flex justify-between mb-2">
            <span className="text-xl font-bold text-white">{toToken}</span>
            <span className="text-xs text-slate-400">
              Balance: {(swapMode === "usdc-to-trax" ? traxBalance : usdcBalance).toFixed(2)}
            </span>
          </div>
          <div className="text-white text-lg font-semibold">
            {outputAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!isValid || !isValidBalance || isSwapping}
        className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
          !isValid || !isValidBalance || isSwapping
            ? "bg-slate-700 opacity-50 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl"
        }`}
      >
        {isSwapping ? (
          <>
            <span className="inline-block animate-spin">⏳</span>
            Swapping...
          </>
        ) : !isValidBalance ? (
          "Insufficient Balance"
        ) : (
          <>
            Swap {fromToken} → {toToken}
          </>
        )}
      </button>

      {/* Info Text */}
      {inputAmount && (
        <div className="mt-3 p-3 bg-slate-700 rounded text-sm text-slate-300">
          <p>
            You'll receive <span className="text-white font-semibold">{outputAmount.toFixed(2)}</span> {toToken}
          </p>
        </div>
      )}
    </div>
  );
}
