// Stats and achievements management

export interface PlayerStats {
  totalRaces: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  favoriteRoachSpeed: number;
  favoriteRoachAgility: number;
  favoriteRoachStamina: number;
  totalEarnings: number;
  lastRaceTime: number;
  itemsPurchased: number;
}

export const DEFAULT_STATS: PlayerStats = {
  totalRaces: 0,
  totalWins: 0,
  totalLosses: 0,
  winRate: 0,
  favoriteRoachSpeed: 5,
  favoriteRoachAgility: 5,
  favoriteRoachStamina: 5,
  totalEarnings: 0,
  lastRaceTime: 0,
  itemsPurchased: 0,
};

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  wallet: string;
  winnings: number;
  wins: number;
  totalRaces: number;
  timestamp: number;
}

/**
 * Load player stats from localStorage
 */
export function loadStats(): PlayerStats {
  const stored = localStorage.getItem("rrc_stats");
  return stored ? JSON.parse(stored) : DEFAULT_STATS;
}

/**
 * Save player stats to localStorage
 */
export function saveStats(stats: PlayerStats): void {
  localStorage.setItem("rrc_stats", JSON.stringify(stats));
}

/**
 * Record a race result and update stats
 */
export function recordRaceResult(
  position: 1 | 2 | 3 | 4 | 5,
  winnings: number,
  roachSpeed: number,
  roachAgility: number,
  roachStamina: number
): PlayerStats {
  const stats = loadStats();

  stats.totalRaces += 1;
  if (position === 1) {
    stats.totalWins += 1;
  } else {
    stats.totalLosses += 1;
  }

  stats.winRate = (stats.totalWins / stats.totalRaces) * 100;
  stats.totalEarnings += winnings;
  stats.lastRaceTime = Date.now();

  // Update favorite roach stats (using a simple average of roach stats from the race)
  stats.favoriteRoachSpeed = Math.round(
    (stats.favoriteRoachSpeed * (stats.totalRaces - 1) + roachSpeed) /
      stats.totalRaces
  );
  stats.favoriteRoachAgility = Math.round(
    (stats.favoriteRoachAgility * (stats.totalRaces - 1) + roachAgility) /
      stats.totalRaces
  );
  stats.favoriteRoachStamina = Math.round(
    (stats.favoriteRoachStamina * (stats.totalRaces - 1) + roachStamina) /
      stats.totalRaces
  );

  saveStats(stats);
  checkAndUnlockAchievements(stats);

  return stats;
}

/**
 * Record a shop purchase
 */
export function recordItemPurchase(): PlayerStats {
  const stats = loadStats();
  stats.itemsPurchased += 1;
  saveStats(stats);
  checkAndUnlockAchievements(stats);
  return stats;
}

/**
 * Load leaderboard from localStorage
 */
export function loadLeaderboard(): LeaderboardEntry[] {
  const stored = localStorage.getItem("rrc_leaderboard");
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save leaderboard to localStorage
 */
export function saveLeaderboard(entries: LeaderboardEntry[]): void {
  localStorage.setItem("rrc_leaderboard", JSON.stringify(entries));
}

/**
 * Add or update player on leaderboard
 */
export function updateLeaderboard(
  wallet: string,
  playerName: string,
  wins: number,
  totalRaces: number,
  winnings: number
): void {
  const leaderboard = loadLeaderboard();
  const existingIndex = leaderboard.findIndex((e) => e.wallet === wallet);

  if (existingIndex >= 0) {
    leaderboard[existingIndex] = {
      ...leaderboard[existingIndex],
      playerName,
      wins,
      totalRaces,
      winnings,
      timestamp: Date.now(),
    };
  } else {
    leaderboard.push({
      rank: leaderboard.length + 1,
      playerName,
      wallet,
      wins,
      totalRaces,
      winnings,
      timestamp: Date.now(),
    });
  }

  // Re-sort and rank
  const sorted = leaderboard
    .sort((a, b) => b.winnings - a.winnings)
    .map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));

  saveLeaderboard(sorted);
}

/**
 * Load unlocked achievements from localStorage
 */
export function loadAchievements(): string[] {
  const stored = localStorage.getItem("rrc_achievements");
  return stored ? JSON.parse(stored) : [];
}

/**
 * Unlock an achievement
 */
export function unlockAchievement(id: string): boolean {
  const achievements = loadAchievements();
  if (!achievements.includes(id)) {
    achievements.push(id);
    localStorage.setItem("rrc_achievements", JSON.stringify(achievements));
    return true;
  }
  return false;
}

/**
 * Check and unlock achievements based on current stats
 */
export function checkAndUnlockAchievements(stats: PlayerStats): string[] {
  const unlockedNew: string[] = [];

  // First Race
  if (stats.totalRaces >= 1 && unlockAchievement("first_race")) {
    unlockedNew.push("first_race");
  }

  // First Win
  if (stats.totalWins >= 1 && unlockAchievement("first_win")) {
    unlockedNew.push("first_win");
  }

  // 5 Wins
  if (stats.totalWins >= 5 && unlockAchievement("five_wins")) {
    unlockedNew.push("five_wins");
  }

  // 10 Wins
  if (stats.totalWins >= 10 && unlockAchievement("ten_wins")) {
    unlockedNew.push("ten_wins");
  }

  // Perfect Speed (10/10)
  if (stats.favoriteRoachSpeed >= 10 && unlockAchievement("perfect_ten")) {
    unlockedNew.push("perfect_ten");
  }

  // Perfectly Balanced (8+ in all)
  if (
    stats.favoriteRoachSpeed >= 8 &&
    stats.favoriteRoachAgility >= 8 &&
    stats.favoriteRoachStamina >= 8 &&
    unlockAchievement("balanced_roach")
  ) {
    unlockedNew.push("balanced_roach");
  }

  // $100 Earned
  if (stats.totalEarnings >= 100 && unlockAchievement("rich_racer")) {
    unlockedNew.push("rich_racer");
  }

  // 5 Items Purchased
  if (stats.itemsPurchased >= 5 && unlockAchievement("shop_lover")) {
    unlockedNew.push("shop_lover");
  }

  return unlockedNew;
}
