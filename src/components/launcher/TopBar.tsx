import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut, Minus, Settings, Square, X } from "lucide-react";
import { useState } from "react";
import { beginDiscordLogin, logoutDiscord } from "@/services/launcher";
import { serversQuery, userQuery } from "@/services/queries";
import { StatusDot } from "./ui";

export function TopBar() {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery(userQuery);
  const { data: servers } = useQuery(serversQuery);
  const [authError, setAuthError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const allUp = servers?.every((s) => s.online) ?? true;
  const authenticated = user?.authenticated === true;

  async function handleLogout() {
    setAuthError("");
    setLoggingOut(true);
    try {
      await logoutDiscord();
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch {
      setAuthError("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="drag-region absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-end gap-4 pl-8 pr-2">
      <div className="no-drag hidden items-center gap-2 label-caps text-[10px] text-muted-foreground sm:flex">
        <StatusDot />
        {allUp ? "All systems operational" : "Degraded service"}
      </div>
      <div className="hidden h-4 w-px bg-hairline sm:block" />

      <div className="no-drag flex min-w-0 items-center gap-2">
        {authenticated && user ? (
          <>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="size-7 rounded-full border border-foreground/15 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="grid size-7 place-items-center rounded-full bg-foreground/10 text-[10px]">
                {(user.displayName || user.username).slice(0, 1).toUpperCase()}
              </span>
            )}
            <span className="max-w-24 truncate text-xs text-foreground/90 sm:max-w-36">
              {user.displayName || user.username}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 rounded-sm border border-foreground/15 px-2 py-1.5 label-caps text-[9px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-50"
              title="Sign out of Discord"
            >
              <LogOut className="size-3" />
              <span className="hidden sm:inline">{loggingOut ? "Signing out" : "Logout"}</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={beginDiscordLogin}
            className="flex items-center gap-2 rounded-sm border border-foreground/20 bg-foreground/[0.04] px-3 py-1.5 label-caps text-[10px] tracking-wider text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/[0.08]"
          >
            <LogIn className="size-3.5" />
            {isLoading ? "CHECKING..." : "LOGIN WITH DISCORD"}
          </button>
        )}
      </div>

      <Link
        to="/settings"
        className="no-drag text-muted-foreground transition-all duration-300 hover:rotate-45 hover:text-foreground"
        aria-label="Settings"
      >
        <Settings className="size-4" strokeWidth={1.5} />
      </Link>
      {authError && (
        <span role="alert" className="no-drag absolute right-28 top-12 rounded-sm border border-red-500/30 bg-background px-3 py-2 text-xs text-red-400">
          {authError}
        </span>
      )}
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
            className={`grid h-full w-12 place-items-center text-muted-foreground transition-colors ${hover}`}
          >
            <Icon className={action === "maximize" ? "size-3" : "size-3.5"} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </header>
  );
}
