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
        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 transition-all"
      >
        {isLoading ? "Connecting..." : "Connect Wallet"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-sm w-full mx-4 border-2 border-amber-500">
            <h2 className="text-2xl font-bold text-white mb-6">Connect Your Wallet</h2>
            
            <div className="space-y-3">
              <button
                onClick={handleEmailLogin}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                📧 Email Login
              </button>

              <button
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                🔴 Google
              </button>

              <button
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                ⚫ GitHub
              </button>

              <button
                onClick={handlePasskeyLogin}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                🔐 Passkey
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
