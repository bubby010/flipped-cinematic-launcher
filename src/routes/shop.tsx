import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { shopQuery } from "@/services/queries";
import type { Rarity, ShopCategory } from "@/services/types";
import { ArtPlaceholder, LButton, PageHeader } from "@/components/launcher/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Project Flipped Launcher" },
      { name: "description", content: "Cosmetics, bundles and featured items for Project Flipped." },
      { property: "og:title", content: "Shop — Project Flipped" },
      { property: "og:description", content: "Customize your Flipped experience." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(shopQuery),
  component: ShopPage,
});

const categories: ShopCategory[] = ["FEATURED", "COSMETICS", "BUNDLES", "OTHER"];
const rarityTicks: Record<Rarity, number> = { COMMON: 1, RARE: 2, EPIC: 3, LEGENDARY: 4, MYTHIC: 5 };

function ShopPage() {
  const { data: items } = useSuspenseQuery(shopQuery);
  const [cat, setCat] = useState<ShopCategory>("FEATURED");
  const visible = items.filter((i) => i.category === cat);

  return (
    <div className="px-14 pb-16 pt-24 2xl:px-20">
      <PageHeader
        title="Shop"
        subtitle="Customize your Flipped experience."
        right={
          <div className="text-right">
            <div className="label-caps text-[10px] text-muted-foreground">Balance</div>
            <div className="font-mono text-lg">4,250 FC</div>
          </div>
        }
      />
      <div className="mb-8 flex gap-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "relative pb-2 font-display text-lg tracking-[0.16em] transition-colors",
              c === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            {c}
            <span className={cn("absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500", c === cat ? "w-full" : "w-0")} />
          </button>
        ))}
      </div>
      <div key={cat} className="grid grid-cols-2 gap-4 animate-page-in xl:grid-cols-3 2xl:grid-cols-4">
        {visible.map((item, i) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-md border border-hairline bg-surface-1 transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-card"
          >
            <ArtPlaceholder seed={i + 1} label={item.type} className="aspect-[4/5]" />
            <div className="border-t border-hairline p-5">
              <div className="flex items-center justify-between">
                <span className="label-caps text-[10px] text-muted-foreground">{item.rarity}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, t) => (
                    <span key={t} className={cn("h-2.5 w-0.5", t < rarityTicks[item.rarity] ? "bg-silver" : "bg-surface-3")} />
                  ))}
                </div>
              </div>
              <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.06em]">{item.name}</h3>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-sm">{item.price.toLocaleString()} FC</span>
                <LButton size="sm" variant="primary">Buy</LButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
