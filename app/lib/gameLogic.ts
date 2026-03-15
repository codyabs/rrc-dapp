// Off-chain game logic for MTGN and TRAX modes

export type RoachStats = {
  speed: number;
  agility: number;
  stamina: number;
};

export type GameResult = {
  position: 1 | 2 | 3 | 4 | 5;
  winnings: number;
  stats: RoachStats;
};

export type ShopItem = {
  id: number;
  name: string;
  price: number;
  category: "boost" | "equipment" | "cosmetic";
  effect?: {
    speed?: number;
    agility?: number;
    stamina?: number;
  };
};

/**
 * Roll a roach with random stats
 */
export function rollRoach(): RoachStats {
  return {
    speed: Math.random() * 100,
    agility: Math.random() * 100,
    stamina: Math.random() * 100,
  };
}

/**
 * Simulate a race with 5 roaches
 * Determines winner based on stats and randomness
 */
export function simulateRace(
  playerStats: RoachStats,
  opponentStats: RoachStats[] = [],
  numberOfRounds: number = 3
): GameResult {
  // Generate missing opponents
  while (opponentStats.length < 4) {
    opponentStats.push(rollRoach());
  }

  let positions: { stats: RoachStats; score: number }[] = [
    { stats: playerStats, score: 0 },
    ...opponentStats.map((s) => ({ stats: s, score: 0 })),
  ];

  // Simulate multiple rounds of racing
  for (let round = 0; round < numberOfRounds; round++) {
    positions.forEach((p) => {
      const speedScore = p.stats.speed * 0.5;
      const agilityScore = p.stats.agility * 0.3;
      const staminaScore = p.stats.stamina * 0.2;
      const randomFactor = Math.random() * 20;

      p.score += speedScore + agilityScore + staminaScore + randomFactor;
    });
  }

  // Sort by score (highest first)
  positions.sort((a, b) => b.score - a.score);

  const playerPosition = (
    positions.findIndex((p) => p.stats === playerStats) + 1
  ) as 1 | 2 | 3 | 4 | 5;

  // Calculate winnings based on position
  const winnings = calculateWinnings(playerPosition);

  return {
    position: playerPosition,
    winnings,
    stats: playerStats,
  };
}

/**
 * Calculate TRAX winnings based on position
 */
export function calculateWinnings(position: 1 | 2 | 3 | 4 | 5): number {
  const payouts: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 100,
    2: 50,
    3: 25,
    4: 10,
    5: 0,
  };
  return payouts[position];
}

/**
 * Apply a shop item boost to roach stats
 */
export function applyBoost(
  stats: RoachStats,
  boost: { speed?: number; agility?: number; stamina?: number }
): RoachStats {
  return {
    speed: Math.min(100, (stats.speed || 0) + (boost.speed || 0)),
    agility: Math.min(100, (stats.agility || 0) + (boost.agility || 0)),
    stamina: Math.min(100, (stats.stamina || 0) + (boost.stamina || 0)),
  };
}

/**
 * Get default shop items
 */
export function getDefaultShopItems(): ShopItem[] {
  return [
    {
      id: 1,
      name: "Speed Serum",
      price: 10,
      category: "boost",
      effect: { speed: 15 },
    },
    {
      id: 2,
      name: "Agility Elixir",
      price: 10,
      category: "boost",
      effect: { agility: 15 },
    },
    {
      id: 3,
      name: "Stamina Stone",
      price: 10,
      category: "boost",
      effect: { stamina: 15 },
    },
    {
      id: 4,
      name: "Racing Legs",
      price: 25,
      category: "equipment",
      effect: { speed: 20, agility: 10 },
    },
    {
      id: 5,
      name: "Golden Shell",
      price: 50,
      category: "cosmetic",
    },
    {
      id: 6,
      name: "Lucky Charm",
      price: 100,
      category: "equipment",
      effect: { speed: 10, agility: 10, stamina: 10 },
    },
  ];
}
