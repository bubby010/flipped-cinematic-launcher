// Domain types shared by the UI and the (future) backend services.
export type ServerRegion = "NA-EAST" | "EU" | "NA-WEST";

export interface ServerStatus {
  region: ServerRegion;
  online: boolean;
  pingMs: number;
  players?: number;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  status: "online" | "away" | "offline";
}

export interface BuildInfo {
  id: string;
  title: string;
  chapter: number;
  season: number;
  version: string;
  installed: boolean;
  installPath: string;
  lastUpdated: string;
  sizeGb: number;
}

export type ShopCategory = "FEATURED" | "COSMETICS" | "BUNDLES" | "OTHER";
export type Rarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY" | "MYTHIC";

export interface ShopItem {
  id: string;
  name: string;
  category: ShopCategory;
  rarity: Rarity;
  price: number;
  type: string;
}

export interface LeaderboardEntry {
  rank: number;
  player: string;
  wins: number;
  kills: number;
  matches: number;
  points: number;
  isSelf?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  featured?: boolean;
}

export interface UpdateInfo {
  version: string;
  headline: string;
  date: string;
}
