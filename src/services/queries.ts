import { queryOptions } from "@tanstack/react-query";
import * as api from "./launcher";
import type { ServerRegion } from "./types";

export const userQuery = queryOptions({ queryKey: ["user"], queryFn: api.getCurrentUser });
export const serversQuery = queryOptions({ queryKey: ["servers"], queryFn: api.getServerStatus });
export const buildQuery = queryOptions({ queryKey: ["build"], queryFn: api.getInstalledBuild });
export const updateQuery = queryOptions({ queryKey: ["update"], queryFn: api.getLatestUpdate });
export const shopQuery = queryOptions({ queryKey: ["shop"], queryFn: api.getShopItems });
export const newsQuery = queryOptions({ queryKey: ["news"], queryFn: api.getNews });
export const leaderboardQuery = (region: ServerRegion | "GLOBAL") =>
  queryOptions({ queryKey: ["leaderboard", region], queryFn: () => api.getLeaderboard(region) });
