"use client";

import { useState } from "react";

export function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading] = useState(false);

  const handleEmailLogin = async () => {
    alert("Email login will be available once AGW is fully integrated. For now, you can use the mock wallet.");
    setIsOpen(false);
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    alert(`${provider} login will be available once AGW is fully integrated. For now, you can use the mock wallet.`);
    setIsOpen(false);
  };

  const handlePasskeyLogin = async () => {
    alert("Passkey login will be available once AGW is fully integrated. For now, you can use the mock wallet.");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 transition-all shadow-lg"
      >
        {isLoading ? "Connecting..." : "🔗 Connect Wallet"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-8 max-w-sm w-full mx-4 border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
            <p className="text-slate-400 text-sm mb-6">Sign in to start playing</p>
            
            <div className="space-y-3">
              <button
                onClick={handleEmailLogin}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 shadow-lg"
              >
                📧 Email Login
              </button>

              <button
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 shadow-lg"
              >
                🔴 Google
              </button>

              <button
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 shadow-lg"
              >
                ⚫ GitHub
              </button>

              <button
                onClick={handlePasskeyLogin}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 shadow-lg"
              >
                🔐 Passkey
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all border border-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
