import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Minus, Settings, Square, X } from "lucide-react";
import { isDemoMode, launcherBridge } from "@/services/launcher";
import { serversQuery, userQuery } from "@/services/queries";
import { StatusDot } from "./ui";

export function TopBar() {
  const { data: user } = useQuery(userQuery);
  const { data: servers } = useQuery(serversQuery);
  const allUp = servers?.every((s) => s.online) ?? false;

  return (
    <header className="drag-region absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-end gap-2 pl-2 sm:gap-6 sm:pl-8">
      <div className="no-drag flex items-center gap-2 label-caps text-[10px] text-muted-foreground">
        <StatusDot />
        {allUp ? "All systems operational" : "Degraded service"}
      </div>
      <div className="h-4 w-px bg-hairline" />
      <span className="no-drag hidden text-xs text-foreground/80 sm:inline">@{user?.username ?? "…"}</span>
      <Link
        to="/settings"
        className="no-drag text-muted-foreground transition-all duration-300 hover:rotate-45 hover:text-foreground"
        aria-label="Settings"
      >
        <Settings className="size-4" strokeWidth={1.5} />
      </Link>
      <div className="no-drag flex h-full">
        {(
          [
            ["minimize", Minus, "hover:bg-foreground/5"],
            ["maximize", Square, "hover:bg-foreground/5"],
            ["close", X, "hover:bg-destructive hover:text-destructive-foreground"],
          ] as const
        ).map(([action, Icon, hover]) => (
          <button
            key={action}
            aria-label={action}
            onClick={() => launcherBridge.window(action)}
            className={`grid h-full w-9 place-items-center text-muted-foreground transition-colors sm:w-12 ${hover}`}
          >
            <Icon className={action === "maximize" ? "size-3" : "size-3.5"} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </header>
  );
}
