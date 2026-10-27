import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Home, Library, ShoppingBag, Trophy, Newspaper, Settings } from "lucide-react";
import { userQuery } from "@/services/queries";
import { StatusDot } from "./ui";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/library", label: "Library", icon: Library },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/news", label: "News", icon: Newspaper },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid size-9 place-items-center rounded-sm border border-foreground/25">
        <span className="font-display text-xl font-bold leading-none text-silver-gradient [transform:scaleY(-1)]">F</span>
      </div>
      <div className="hidden leading-none sm:block">
        <div className="label-caps text-[9px] text-muted-foreground">Project</div>
        <div className="font-display text-xl font-bold tracking-[0.14em] text-silver-gradient">FLIPPED</div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { data: user } = useQuery(userQuery);
  return (
    <aside className="relative z-20 flex w-16 shrink-0 flex-col border-r border-hairline bg-surface-0/95 sm:w-60 2xl:w-64">
      <div className="drag-region flex h-20 items-center justify-center px-2 sm:justify-start sm:px-6">
        <Logo />
      </div>
      <nav className="mt-6 flex flex-1 flex-col gap-0.5 px-2 sm:px-3">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group relative flex h-11 items-center justify-center gap-4 rounded-sm px-2 text-muted-foreground sm:justify-start sm:px-4 transition-colors duration-300 hover:bg-foreground/[0.03] hover:text-foreground data-[status=active]:bg-foreground/[0.05] data-[status=active]:text-foreground"
          >
            <span className="absolute left-0 top-1/2 h-0 w-px -translate-y-1/2 bg-foreground transition-all duration-500 ease-[var(--ease-out)] group-data-[status=active]:h-6" />
            <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
            <span className="hidden font-display text-[15px] uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-x-0.5 sm:inline">
              {label}
            </span>
          </Link>
        ))}
      </nav>
      <div className="m-2 flex items-center justify-center gap-3 rounded-sm border border-hairline bg-surface-1 p-2 sm:m-3 sm:justify-start sm:p-3">
        <div className="relative">
          <div className="grid size-10 place-items-center rounded-full bg-surface-3 font-display text-lg text-silver">
            {user?.displayName.charAt(0) ?? "F"}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-surface-1 bg-online" />
        </div>
        <div className="hidden min-w-0 leading-tight sm:block">
          <div className="font-display text-sm tracking-[0.12em]">{user?.displayName ?? "—"}</div>
          <div className="truncate text-xs text-muted-foreground">@{user?.username ?? "…"}</div>
          <div className="mt-1 flex items-center gap-1.5 label-caps text-[9px] text-online">
            <StatusDot /> Preview
          </div>
        </div>
      </div>
    </aside>
  );
}
