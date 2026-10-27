import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { leaderboardQuery } from "@/services/queries";
import type { ServerRegion } from "@/services/types";
import { PageHeader, ProgressBar } from "@/components/launcher/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Project Flipped Launcher" },
      { name: "description", content: "Top players in Project Flipped by region." },
      { property: "og:title", content: "Leaderboard — Project Flipped" },
      { property: "og:description", content: "Top players in Project Flipped." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(leaderboardQuery("GLOBAL")),
  component: LeaderboardPage,
});

const tabs: (ServerRegion | "GLOBAL")[] = ["GLOBAL", "NA-EAST", "EU", "NA-WEST"];
const cols = "grid grid-cols-[80px_1fr_110px_110px_110px_130px] items-center px-6";

function LeaderboardPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("GLOBAL");
  const { data, isFetching } = useQuery(leaderboardQuery(tab));

  return (
    <div className="px-14 pb-16 pt-24 2xl:px-20">
      <PageHeader title="Leaderboard" subtitle="Top players in Project Flipped" />
      <div className="mb-6 inline-flex rounded-sm border border-hairline bg-surface-1 p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "h-9 rounded-sm px-6 font-display tracking-[0.14em] transition-all duration-300",
              t === tab ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="h-px">{isFetching && <ProgressBar value={0} indeterminate />}</div>
      <div className="overflow-hidden rounded-md border border-hairline bg-surface-1">
        <div className={cn(cols, "h-11 border-b border-hairline label-caps text-[10px] text-muted-foreground")}>
          <span>Rank</span>
          <span>Player</span>
          <span className="text-right">Wins</span>
          <span className="text-right">Kills</span>
          <span className="text-right">Matches</span>
          <span className="text-right">Points</span>
        </div>
        <div key={tab} className="animate-page-in">
          {data?.map((r) => (
            <div
              key={r.rank}
              className={cn(
                cols,
                "h-14 border-b border-hairline font-mono text-sm transition-colors last:border-b-0 hover:bg-foreground/[0.03]",
                r.isSelf && "relative bg-foreground/[0.04] outline outline-1 -outline-offset-1 outline-foreground/30",
              )}
            >
              <span className={cn("font-display text-2xl", r.rank <= 3 ? "text-foreground" : "text-muted-foreground")}>
                {String(r.rank).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-3 font-sans">
                <span className="grid size-8 place-items-center rounded-full bg-surface-3 font-display text-silver">{r.player[0]}</span>
                <span className="font-medium">{r.player}</span>
                {r.isSelf && <span className="label-caps rounded-sm border border-foreground/30 px-1.5 py-0.5 text-[9px]">You</span>}
              </span>
              <span className="text-right">{r.wins}</span>
              <span className="text-right">{r.kills}</span>
              <span className="text-right text-muted-foreground">{r.matches}</span>
              <span className="text-right text-foreground">{r.points.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
