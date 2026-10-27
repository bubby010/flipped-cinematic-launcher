import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import hero from "@/assets/hero.png.asset.json";
import { newsQuery } from "@/services/queries";
import { ArtPlaceholder, LButton, PageHeader, Panel } from "@/components/launcher/ui";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Project Flipped Launcher" },
      { name: "description", content: "Updates, patch notes and community news for Project Flipped." },
      { property: "og:title", content: "News — Project Flipped" },
      { property: "og:description", content: "The latest from Project Flipped." },
    ],
  }),
  // Launcher data is client-rendered (desktop app); loaders fill the query cache.
  ssr: false,
  loader: ({ context }) => context.queryClient.ensureQueryData(newsQuery),
  component: NewsPage,
});

function NewsPage() {
  const { data } = useSuspenseQuery(newsQuery);
  const featured = data.find((n) => n.featured) ?? data[0];
  const rest = data.filter((n) => n.id !== featured.id);

  return (
    <div className="px-5 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-14 2xl:px-20">
      <PageHeader title="News" subtitle="Updates, patch notes and community." />
      <article className="group relative mb-8 h-[420px] overflow-hidden rounded-md border border-hairline">
        <img
          src={hero.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[65%_35%] transition-transform duration-[1500ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-fade-left" />
        <div className="absolute inset-0 bg-fade-bottom" />
        <div className="absolute bottom-10 left-10 max-w-xl">
          <div className="label-caps text-[10px] text-muted-foreground">
            {featured.category} · {featured.date}
          </div>
          <h2 className="mt-3 font-display-tight text-5xl font-bold text-silver-gradient">{featured.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/75">{featured.excerpt}</p>
          <LButton className="mt-6" size="sm">Read article</LButton>
        </div>
      </article>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rest.map((n, i) => (
          <article key={n.id} className="group cursor-pointer">
            <Panel className="h-full overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
              <ArtPlaceholder seed={i + 2} className="aspect-[16/10]" />
              <div className="p-5">
                <div className="flex justify-between label-caps text-[10px] text-muted-foreground">
                  <span>{n.category}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="mt-3 font-display text-xl uppercase tracking-[0.05em]">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
              </div>
            </Panel>
          </article>
        ))}
      </div>
    </div>
  );
}
