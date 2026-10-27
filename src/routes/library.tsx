import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Play, ShieldCheck, SlidersHorizontal } from "lucide-react";
import hero from "@/assets/hero.png.asset.json";
import { buildQuery } from "@/services/queries";
import { launcherBridge } from "@/services/launcher";
import { LButton, PageHeader, Panel, ProgressBar, StatusDot } from "@/components/launcher/ui";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Project Flipped Launcher" },
      { name: "description", content: "Manage your installed Project Flipped builds." },
      { property: "og:title", content: "Library — Project Flipped" },
      { property: "og:description", content: "Your Project Flipped builds." },
    ],
  }),
  // Launcher data is client-rendered (desktop app); loaders fill the query cache.
  ssr: false,
  loader: ({ context }) => context.queryClient.ensureQueryData(buildQuery),
  component: LibraryPage,
});

function LibraryPage() {
  const { data: build } = useSuspenseQuery(buildQuery);
  const [progress, setProgress] = useState<number | null>(null);

  // Mock verification — replace with updater events.
  const verify = () => {
    launcherBridge.verifyFiles();
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p === null || p >= 100) {
          clearInterval(id);
          setTimeout(() => setProgress(null), 1200);
          return 100;
        }
        return Math.min(100, p + Math.random() * 9);
      });
    }, 160);
  };

  const meta = [
    ["Version", build.version],
    ["Status", build.installed ? "Installed" : "Not installed"],
    ["Location", build.installPath],
    ["Last updated", build.lastUpdated],
    ["Size", `${build.sizeGb} GB`],
  ];

  return (
    <div className="px-5 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-14 2xl:px-20">
      <PageHeader title="Library" subtitle="Your Project Flipped builds" />
      <Panel className="group overflow-hidden shadow-card">
        <div className="relative h-80 overflow-hidden 2xl:h-96">
          <img
            src={hero.url}
            alt=""
            className="h-full w-full object-cover object-[65%_35%] transition-transform duration-[1500ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-fade-left" />
          <div className="absolute inset-0 bg-fade-bottom" />
          <div className="absolute bottom-8 left-10">
            <div className="flex items-center gap-2 label-caps text-[10px] text-online">
              <StatusDot /> Ready to play
            </div>
            <h2 className="mt-3 font-display-tight text-6xl font-bold text-silver-gradient">Project Flipped</h2>
            <div className="mt-3 font-display text-xl uppercase tracking-[0.2em] text-foreground/80">
              Chapter {build.chapter} — Season {build.season}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-hairline px-10 py-6">
          <LButton variant="primary" size="lg" onClick={() => launcherBridge.play()}>
            <Play className="size-4 fill-current" /> Play
          </LButton>
          <LButton onClick={verify} disabled={progress !== null}>
            <ShieldCheck className="size-4" strokeWidth={1.5} /> Verify Files
          </LButton>
          <LButton variant="ghost">
            <SlidersHorizontal className="size-4" strokeWidth={1.5} /> Manage
          </LButton>
          <div className="ml-auto w-80">
            <div className="mb-2 flex justify-between label-caps text-[10px] text-muted-foreground">
              <span>{progress === null ? "Up to date" : progress >= 100 ? "Verified" : "Verifying files"}</span>
              <span className="font-mono">{Math.round(progress ?? 100)}%</span>
            </div>
            <ProgressBar value={progress ?? 100} />
          </div>
        </div>
        <dl className="grid grid-cols-1 border-t border-hairline sm:grid-cols-2 lg:grid-cols-5">
          {meta.map(([k, v]) => (
            <div key={k} className="border-b border-hairline px-5 py-4 last:border-b-0 sm:px-6 lg:border-b-0 lg:border-r lg:px-10 lg:py-5 lg:last:border-r-0">
              <dt className="label-caps text-[10px] text-muted-foreground">{k}</dt>
              <dd className="mt-2 truncate font-mono text-xs text-foreground/90" title={v}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
