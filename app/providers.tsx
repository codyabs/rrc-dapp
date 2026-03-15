"use client";

import React, { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { abstract } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create wagmi config for Abstract mainnet
const config = createConfig({
  chains: [abstract],
  transports: {
    [abstract.id]: http("https://api.mainnet.abs.xyz"),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
}
