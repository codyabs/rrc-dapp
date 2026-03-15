// Game Contract ABI for Roach Racing Club
// Contract: 0x7edd91c4dd202032872bfbfcd3a4e4f71cb4b8bc on Abstract mainnet (chain 2741)

export const GAME_CONTRACT_ABI = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buyShopItem",
    inputs: [
      { name: "itemId", type: "uint256" },
      { name: "quantity", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getShopItems",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "name", type: "string" },
          { name: "price", type: "uint256" },
          { name: "category", type: "string" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "topUpTRAX",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapTRAXForUSDC",
    inputs: [{ name: "traxAmount", type: "uint256" }],
    outputs: [{ name: "usdcReceived", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapUSDCForTRAX",
    inputs: [{ name: "usdcAmount", type: "uint256" }],
    outputs: [{ name: "traxReceived", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
  },
] as const;

export const GAME_CONTRACT_ADDRESS =
  "0x7edd91c4dd202032872bfbfcd3a4e4f71cb4b8bc";

// USDC contract on Abstract (for swaps)
export const USDC_CONTRACT_ADDRESS =
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // placeholder - update with actual Abstract USDC

export const USDC_ABI = [
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const;
