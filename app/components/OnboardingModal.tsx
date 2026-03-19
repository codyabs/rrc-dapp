"use client";

import { useState } from "react";

interface OnboardingModalProps {
  onClose: () => void;
}

export function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "🪳 Welcome to Roach Racing Club!",
      content: "Race virtual roaches, earn rewards, and climb the leaderboard. Let's learn how to play!",
      icon: "🏁"
    },
    {
      title: "🎮 Game Modes",
      content: "Choose between MTGN Mode (free off-chain racing) or TRAX Mode (token-based competition with real stakes). Each mode has unique mechanics and rewards!",
      icon: "👾"
    },
    {
      title: "💰 Roach Stats",
      content: "Your roach has Speed, Agility, and Stamina. These determine race performance. Higher stats = better chances of winning! You can reroll for a chance at better stats.",
      icon: "📊"
    },
    {
      title: "🏪 The Shop",
      content: "Purchase boosts, equipment, and cosmetics to enhance your roaches. Some items increase specific stats, while others are purely cosmetic. Spend wisely!",
      icon: "🛍️"
    },
    {
      title: "🏆 Leaderboard & Achievements",
      content: "Compete with other players and earn badges for achievements. Track your win rate, favorite roach stats, and climb to become the ultimate racing champion!",
      icon: "⭐"
    },
    {
      title: "💳 Connect Your Wallet",
      content: "To compete in TRAX Mode and make purchases, connect your Abstract wallet using email, social login, or passkey. Your wallet securely handles all transactions!",
      icon: "🔐"
    },
    {
      title: "🚀 Ready to Race?",
      content: "You now know the basics! Pick a game mode, roll your roaches, and start racing. Good luck, champion! Remember: The house never loses, but you might win big! 🪳💨",
      icon: "🎉"
    }
  ];

  const isLastStep = step === steps.length - 1;
  const currentStep = steps[step];

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 max-w-lg w-full mx-4 border-2 border-amber-500 shadow-2xl">
        {/* Icon */}
        <div className="text-6xl text-center mb-4">{currentStep.icon}</div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          {currentStep.title}
        </h2>

        {/* Content */}
        <p className="text-gray-300 text-center mb-8 leading-relaxed">
          {currentStep.content}
        </p>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx <= step ? "bg-amber-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm text-center mt-2">
            Step {step + 1} of {steps.length}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
          >
            {isLastStep ? "Got It!" : "Skip"}
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
          >
            {isLastStep ? "Start Racing! 🏁" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
