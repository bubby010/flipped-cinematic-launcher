import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Sidebar } from "@/components/launcher/Sidebar";
import { TopBar } from "@/components/launcher/TopBar";

function NotFoundComponent() {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display-tight text-8xl text-silver-gradient">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">This screen doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block label-caps text-foreground underline-offset-4 hover:underline">
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl uppercase">Something went wrong</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-sm bg-primary px-6 py-2 font-display uppercase tracking-widest text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Project Flipped Launcher" },
      { name: "description", content: "The official Project Flipped desktop launcher." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;500;600;700&family=Manrope:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="relative flex-1 overflow-hidden">
          <TopBar />
          <div key={pathname} className="h-full overflow-y-auto animate-page-in">
            <Outlet />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}
