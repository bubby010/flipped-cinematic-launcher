import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { FolderOpen } from "lucide-react";
import { LButton, PageHeader, Toggle } from "@/components/launcher/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Project Flipped Launcher" },
      { name: "description", content: "Configure the Project Flipped launcher and game." },
      { property: "og:title", content: "Settings — Project Flipped" },
      { property: "og:description", content: "Launcher and game settings." },
    ],
  }),
  component: SettingsPage,
});

const sections = ["GENERAL", "GAME", "APPEARANCE", "ABOUT"] as const;

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-8 border-b border-hairline py-5 last:border-b-0">
      <div>
        <div className="text-sm">{label}</div>
        {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const [section, setSection] = useState<(typeof sections)[number]>("GENERAL");
  const [s, setS] = useState({
    startup: true,
    tray: true,
    animations: true,
    autoUpdate: true,
    dark: true,
    bgFx: true,
    reduce: false,
    region: "NA-EAST",
  });
  const set = (k: keyof typeof s) => (v: boolean) => setS((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", s.reduce || !s.animations);
  }, [s.reduce, s.animations]);

  return (
    <div className="px-14 pb-16 pt-24 2xl:px-20">
      <PageHeader title="Settings" subtitle="Launcher and game preferences." />
      <div className="grid grid-cols-[220px_1fr] gap-12">
        <nav className="flex flex-col gap-1">
          {sections.map((x) => (
            <button
              key={x}
              onClick={() => setSection(x)}
              className={cn(
                "flex h-10 items-center border-l px-4 text-left font-display tracking-[0.16em] transition-all duration-300",
                x === section ? "border-foreground text-foreground" : "border-hairline text-muted-foreground hover:text-foreground",
              )}
            >
              {x}
            </button>
          ))}
        </nav>
        <div key={section} className="max-w-3xl animate-page-in">
          {section === "GENERAL" && (
            <>
              <Row label="Launch on startup" hint="Open the launcher when Windows starts."><Toggle checked={s.startup} onChange={set("startup")} /></Row>
              <Row label="Minimize to tray" hint="Keep running in the system tray when closed."><Toggle checked={s.tray} onChange={set("tray")} /></Row>
              <Row label="Animations"><Toggle checked={s.animations} onChange={set("animations")} /></Row>
            </>
          )}
          {section === "GAME" && (
            <>
              <Row label="Fortnite installation path" hint="D:\Games\ProjectFlipped\FortniteGame">
                <LButton size="sm"><FolderOpen className="size-3.5" strokeWidth={1.5} /> Browse</LButton>
              </Row>
              <Row label="Preferred region">
                <select
                  value={s.region}
                  onChange={(e) => setS((p) => ({ ...p, region: e.target.value }))}
                  className="h-9 rounded-sm border border-hairline bg-surface-2 px-3 font-display tracking-[0.12em] outline-none focus:border-foreground/40"
                >
                  {["NA-EAST", "EU", "NA-WEST"].map((r) => <option key={r}>{r}</option>)}
                </select>
              </Row>
              <Row label="Auto-update"><Toggle checked={s.autoUpdate} onChange={set("autoUpdate")} /></Row>
              <Row label="Verify files" hint="Check game files for corruption."><LButton size="sm">Verify</LButton></Row>
            </>
          )}
          {section === "APPEARANCE" && (
            <>
              <Row label="Dark mode" hint="Project Flipped is designed for dark."><Toggle checked={s.dark} onChange={set("dark")} /></Row>
              <Row label="Background effects" hint="Hero parallax and drift."><Toggle checked={s.bgFx} onChange={set("bgFx")} /></Row>
              <Row label="Reduce animations"><Toggle checked={s.reduce} onChange={set("reduce")} /></Row>
            </>
          )}
          {section === "ABOUT" && (
            <>
              <Row label="Project Flipped version"><span className="font-mono text-sm">1.0.0</span></Row>
              <Row label="Website"><a className="text-sm text-muted-foreground hover:text-foreground" href="#">projectflipped.gg</a></Row>
              <Row label="Discord"><a className="text-sm text-muted-foreground hover:text-foreground" href="#">discord.gg/flipped</a></Row>
              <Row label="Credits" hint="Built by the Project Flipped team. Powered by LawinServer & FortMatchmaker."><span /></Row>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
