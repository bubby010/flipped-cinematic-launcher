/**
 * Launcher service layer. Every function is async and returns mock data today.
 * Replace the bodies with real calls (LawinServer, FortMatchmaker, Discord OAuth,
 * updater, game launcher bridge) without touching UI components.
 */
import type {
  BuildInfo,
  LeaderboardEntry,
  NewsArticle,
  ServerRegion,
  ServerStatus,
  ShopItem,
  UpdateInfo,
  UserProfile,
} from "./types";

const delay = <T>(v: T, ms = 120) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export async function getCurrentUser(): Promise<UserProfile> {
  return delay({ id: "u_1", username: "Player", displayName: "FLIPPED", status: "online" });
}

export async function getServerStatus(): Promise<ServerStatus[]> {
  return delay([
    { region: "NA-EAST", online: true, pingMs: 32, players: 1284 },
    { region: "EU", online: true, pingMs: 87, players: 962 },
    { region: "NA-WEST", online: true, pingMs: 54, players: 711 },
  ]);
}

export async function getInstalledBuild(): Promise<BuildInfo> {
  return delay({
    id: "c3s1",
    title: "PROJECT FLIPPED",
    chapter: 3,
    season: 1,
    version: "1.0.0",
    installed: true,
    installPath: "D:\\Games\\ProjectFlipped\\FortniteGame",
    lastUpdated: "Oct 24, 2026",
    sizeGb: 38.6,
  });
}

export async function getLatestUpdate(): Promise<UpdateInfo> {
  return delay({ version: "1.0.0", headline: "Chapter 3 Season 1 is now available.", date: "Oct 24, 2026" });
}

export async function getShopItems(): Promise<ShopItem[]> {
  return delay([
    { id: "s1", name: "Chrome Sentinel", category: "FEATURED", rarity: "LEGENDARY", price: 2000, type: "Outfit" },
    { id: "s2", name: "Null Vector", category: "FEATURED", rarity: "EPIC", price: 1500, type: "Outfit" },
    { id: "s3", name: "Mirror Edge", category: "COSMETICS", rarity: "RARE", price: 800, type: "Pickaxe" },
    { id: "s4", name: "Static Drift", category: "COSMETICS", rarity: "EPIC", price: 1200, type: "Glider" },
    { id: "s5", name: "Obsidian Wrap", category: "COSMETICS", rarity: "COMMON", price: 300, type: "Wrap" },
    { id: "s6", name: "Monolith Pack", category: "BUNDLES", rarity: "MYTHIC", price: 3400, type: "Bundle" },
    { id: "s7", name: "Silver Line Set", category: "BUNDLES", rarity: "LEGENDARY", price: 2800, type: "Bundle" },
    { id: "s8", name: "Flipped Banner", category: "OTHER", rarity: "COMMON", price: 200, type: "Banner" },
  ]);
}

const players = ["PlayerOne", "Flipped", "Shadow", "Vanta", "Kinetic", "Halcyon", "Player", "Mercury", "Nocturne", "Axiom", "Ferro", "Quiet"];

export async function getLeaderboard(region: ServerRegion | "GLOBAL"): Promise<LeaderboardEntry[]> {
  const seed = { GLOBAL: 0, "NA-EAST": 3, EU: 7, "NA-WEST": 11 }[region];
  const rows = players.map((_, i) => {
    const name = i < 3 && region === "GLOBAL" ? players[i] : players[(i + seed) % players.length];
    return {
      rank: i + 1,
      player: name,
      wins: 142 - i * 11 - (seed % 4),
      kills: 981 - i * 67 - seed * 3,
      matches: 320 - i * 19,
      points: 2840 - i * 165 - seed * 5,
      isSelf: name === "Player",
    };
  });
  if (region === "GLOBAL") {
    rows[1] = { ...rows[1], wins: 131, kills: 914, matches: 301, points: 2675 };
    rows[2] = { ...rows[2], wins: 119, kills: 842, matches: 288, points: 2490 };
  }
  return delay(rows);
}

export async function getNews(): Promise<NewsArticle[]> {
  return delay([
    { id: "n1", featured: true, title: "Chapter 3 Season 1 Has Arrived", category: "UPDATE", date: "Oct 24, 2026", excerpt: "A rebuilt island, restored mechanics and full regional matchmaking. Here's everything that landed in 1.0.0." },
    { id: "n2", title: "EU Servers Now Live", category: "SERVERS", date: "Oct 20, 2026", excerpt: "Lower latency for players across Europe with our new Frankfurt region." },
    { id: "n3", title: "Competitive Season Rules", category: "COMPETITIVE", date: "Oct 18, 2026", excerpt: "How points, placements and leaderboard resets work this season." },
    { id: "n4", title: "Launcher 1.0 Release Notes", category: "LAUNCHER", date: "Oct 15, 2026", excerpt: "A faster updater, file verification and a new interface." },
    { id: "n5", title: "Community Spotlight", category: "COMMUNITY", date: "Oct 12, 2026", excerpt: "Highlights and clips from the first week of the season." },
  ]);
}

/** Bridge to the desktop shell. No-ops in the browser preview. */
export const launcherBridge = {
  play: async () => console.info("[launcher] play requested"),
  verifyFiles: async () => console.info("[launcher] verify requested"),
  window: (action: "minimize" | "maximize" | "close") => console.info("[launcher] window", action),
};
