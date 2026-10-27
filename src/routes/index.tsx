import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import hero from "@/assets/hero.png.asset.json";
import { newsQuery, serversQuery, updateQuery } from "@/services/queries";
import { launcherBridge } from "@/services/launcher";
import { ArtPlaceholder, LButton, Panel, SectionLabel, StatusDot, lbutton } from "@/components/launcher/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Project Flipped Launcher" },
      { name: "description", content: "Play Project Flipped Chapter 3 Season 1, check servers and latest updates." },
      { property: "og:title", content: "Project Flipped Launcher" },
      { property: "og:description", content: "Chapter 3 Season 1 is now available." },
    ],
  }),
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(serversQuery),
      queryClient.ensureQueryData(updateQuery),
      queryClient.ensureQueryData(newsQuery),
    ]),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -14;
      const y = (e.clientY / window.innerHeight - 0.5) * -10;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[520px] overflow-hidden">
      <div ref={ref} className="absolute -inset-6 transition-transform duration-[1200ms] ease-[var(--ease-out)]">
        <img
          src={hero.url}
          alt="Chrome humanoid figure in a field of stars"
          className="h-full w-full object-cover object-[65%_40%] animate-hero-drift"
        />
      </div>
      <div className="absolute inset-0 bg-fade-left" />
      <div className="absolute inset-0 bg-fade-bottom" />
      <div className="pointer-events-none absolute inset-0 vignette" />

      <div className="relative flex h-full flex-col justify-end px-14 pb-16 2xl:px-20">
        <div className="mb-6 flex items-center gap-3 label-caps text-muted-foreground">
          <span className="h-px w-10 bg-foreground/40" /> Now Live
        </div>
        <h1 className="font-display-tight text-[clamp(4.5rem,9vw,10rem)] font-bold text-silver-gradient">
          Project
          <br />
          Flipped
        </h1>
        <div className="mt-6 flex items-center gap-6 font-display text-2xl uppercase tracking-[0.2em] text-foreground/85">
          <span>Chapter 3</span>
          <span className="h-5 w-px bg-foreground/30" />
          <span>Season 1</span>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <LButton variant="primary" size="lg" onClick={() => launcherBridge.play()}>
            <Play className="size-4 fill-current" /> Play Now
          </LButton>
          <Link to="/library" className={lbutton({ variant: "outline", size: "lg" })}>
            View Library
          </Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const { data: servers } = useSuspenseQuery(serversQuery);
  const { data: update } = useSuspenseQuery(updateQuery);
  const { data: news } = useSuspenseQuery(newsQuery);

  return (
    <div>
      <Hero />
      <div className="grid grid-cols-12 gap-8 px-14 pb-16 2xl:px-20">
        <div className="col-span-12 xl:col-span-7">
          <SectionLabel>Server Status</SectionLabel>
          <div className="grid grid-cols-3 gap-3">
            {servers.map((s) => (
              <Panel key={s.region} className="p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg tracking-[0.14em]">{s.region}</span>
                  <StatusDot />
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <span className="label-caps text-[10px] text-online">{s.online ? "Online" : "Offline"}</span>
                  <span className="font-mono text-sm text-foreground/80">
                    {s.pingMs}
                    <span className="ml-1 text-muted-foreground">MS</span>
                  </span>
                </div>
              </Panel>
            ))}
          </div>
        </div>
        <div className="col-span-12 xl:col-span-5">
          <SectionLabel>Latest Update</SectionLabel>
          <Panel className="flex items-center justify-between gap-6 p-5">
            <div>
              <div className="label-caps text-[10px] text-muted-foreground">Project Flipped</div>
              <div className="mt-1 font-display text-2xl tracking-[0.1em]">Version {update.version}</div>
              <p className="mt-2 text-sm text-muted-foreground">{update.headline}</p>
            </div>
            <Link to="/news" className={lbutton({ size: "sm" })}>
              View Update
            </Link>
          </Panel>
        </div>
        <div className="col-span-12">
          <SectionLabel
            right={
              <Link to="/news" className="group flex items-center gap-2 label-caps text-[10px] text-muted-foreground hover:text-foreground">
                All news <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            }
          >
            News
          </SectionLabel>
          <div className="grid grid-cols-3 gap-4">
            {news.slice(0, 3).map((n, i) => (
              <Link key={n.id} to="/news" className="group block">
                <Panel className="overflow-hidden">
                  <ArtPlaceholder seed={i} className="aspect-[16/8]" />
                  <div className="p-5">
                    <div className="label-caps text-[10px] text-muted-foreground">
                      {n.category} · {n.date}
                    </div>
                    <div className="mt-2 font-display text-lg uppercase tracking-[0.06em]">{n.title}</div>
                  </div>
                </Panel>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
