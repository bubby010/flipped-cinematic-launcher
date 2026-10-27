
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ArrowRight, Play, Wifi, Newspaper } from "lucide-react";
import hero from "@/assets/hero.png.asset.json";
import { newsQuery, serversQuery, updateQuery } from "@/services/queries";
import { launcherBridge } from "@/services/launcher";
import {
  ArtPlaceholder,
  LButton,
  Panel,
  SectionLabel,
  lbutton,
} from "@/components/launcher/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Project Flipped Launcher" },
      {
        name: "description",
        content:
          "Play Project Flipped Chapter 3 Season 1, check server status, and explore the latest updates.",
      },
      { property: "og:title", content: "Project Flipped Launcher" },
      {
        property: "og:description",
        content: "Return to Chapter 3 Season 1.",
      },
    ],
  }),
  ssr: false,
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

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -8;
      const y = (e.clientY / window.innerHeight - 0.5) * -5;

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="relative min-h-[500px] h-[70vh] max-h-[850px] overflow-hidden">
      <div
        ref={ref}
        className="absolute -inset-4 transition-transform duration-700 ease-out"
      >
        <img
          src={hero.url}
          alt="Chrome humanoid figure surrounded by stars"
          className="h-full w-full object-cover object-[65%_40%] animate-hero-drift"
        />
      </div>

      <div className="absolute inset-0 bg-fade-left" />
      <div className="absolute inset-0 bg-fade-bottom" />
      <div className="pointer-events-none absolute inset-0 vignette" />

      <div className="relative flex h-full flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-12 lg:px-14 lg:pb-16 2xl:px-20">
        <div className="mb-5 flex items-center gap-3 label-caps text-muted-foreground">
          <span className="h-px w-8 bg-foreground/50" />
          <span className="tracking-[0.28em]">Project Flipped</span>
          <span className="rounded-sm border border-foreground/20 px-2 py-1 text-[9px] tracking-[0.18em]">
            CHAPTER 03
          </span>
        </div>

        <h1 className="font-display-tight text-[clamp(3.8rem,8vw,8rem)] font-bold leading-[0.82] tracking-[-0.045em] text-silver-gradient">
          PROJECT
          <br />
          FLIPPED<span className="text-foreground/50">.</span>
        </h1>

        <div className="mt-6 flex items-center gap-3 font-display text-base uppercase tracking-[0.22em] text-foreground/75 sm:text-xl">
          <span>Chapter 3</span>
          <span className="h-4 w-px bg-foreground/30" />
          <span>Season 1</span>
        </div>

        <p className="mt-4 max-w-md text-sm leading-6 text-foreground/65 sm:text-base">
          A return to the island. Relive the era that made it unforgettable.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <LButton
            variant="primary"
            size="lg"
            onClick={() => launcherBridge.play()}
          >
            <Play className="size-4 fill-current" />
            Play Now
          </LButton>

          <Link
            to="/library"
            className={lbutton({ variant: "outline", size: "lg" })}
          >
            View Library
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-2 label-caps text-[9px] text-muted-foreground/80">
          <span className="size-1.5 rounded-full bg-foreground/70" />
          COMMUNITY PROJECT
          <span className="mx-1 text-foreground/25">/</span>
          CHAPTER 3 SEASON 1
        </div>
      </div>
    </section>
  );
}

function Home() {
  const { data: servers } = useSuspenseQuery(serversQuery);
  const { data: update } = useSuspenseQuery(updateQuery);
  const { data: news } = useSuspenseQuery(newsQuery);

  const onlineCount = servers.filter((server) => server.online).length;

  return (
    <main className="min-w-0">
      <Hero />

      <div className="space-y-12 px-5 pb-12 pt-10 sm:px-8 lg:px-14 lg:pb-16 lg:pt-12 2xl:px-20">
        <section>
          <SectionLabel
            right={
              <div className="flex items-center gap-2 label-caps text-[10px] text-muted-foreground">
                <span
                  className={`size-1.5 rounded-full ${
                    onlineCount > 0 ? "bg-online" : "bg-red-500"
                  }`}
                />
                {onlineCount} OF {servers.length} REGIONS ONLINE
              </div>
            }
          >
            <span className="flex items-center gap-2">
              <Wifi className="size-3.5 text-muted-foreground" />
              Server Status
            </span>
          </SectionLabel>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {servers.map((server) => (
              <Panel key={server.region} className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg tracking-[0.12em]">
                    {server.region}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`size-1.5 rounded-full ${
                        server.online ? "bg-online" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`label-caps text-[9px] ${
                        server.online
                          ? "text-online"
                          : "text-red-400"
                      }`}
                    >
                      {server.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-foreground/10 pt-4">
                  <span className="label-caps text-[9px] text-muted-foreground">
                    Connection
                  </span>

                  <span className="font-mono text-sm text-foreground/80">
                    {server.online ? server.pingMs : "—"}
                    <span className="ml-1 text-[10px] text-muted-foreground">
                      {server.online ? "MS" : ""}
                    </span>
                  </span>
                </div>
              </Panel>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Latest Release</SectionLabel>

          <Panel className="relative overflow-hidden p-5 sm:p-7">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-foreground/[0.035] to-transparent" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="label-caps text-[9px] tracking-[0.22em] text-muted-foreground">
                  PROJECT FLIPPED / UPDATE
                </div>

                <div className="mt-2 font-display text-2xl tracking-[0.08em] sm:text-3xl">
                  VERSION {update.version}
                </div>

                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {update.headline}
                </p>
              </div>

              <Link
                to="/news"
                className={lbutton({ size: "md" })}
              >
                Release Notes
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Panel>
        </section>

        <section>
          <SectionLabel
            right={
              <Link
                to="/news"
                className="group flex items-center gap-2 label-caps text-[10px] text-muted-foreground transition-colors hover:text-foreground"
              >
                All news
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            }
          >
            <span className="flex items-center gap-2">
              <Newspaper className="size-3.5 text-muted-foreground" />
              Latest News
            </span>
          </SectionLabel>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {news.slice(0, 3).map((item, index) => (
              <Link
                key={item.id}
                to="/news"
                className="group block min-w-0"
              >
                <Panel className="h-full overflow-hidden transition-colors duration-300 group-hover:border-foreground/25">
                  <div className="relative overflow-hidden">
                    <ArtPlaceholder
                      seed={index}
                      className="aspect-[16/8] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="label-caps text-[9px] tracking-[0.12em] text-muted-foreground">
                      {item.category}
                      <span className="mx-2 text-foreground/25">/</span>
                      {item.date}
                    </div>

                    <div className="mt-3 font-display text-lg uppercase leading-snug tracking-[0.06em]">
                      {item.title}
                    </div>

                    <div className="mt-4 flex items-center gap-2 label-caps text-[9px] text-muted-foreground transition-colors group-hover:text-foreground">
                      Read article
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Panel>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
