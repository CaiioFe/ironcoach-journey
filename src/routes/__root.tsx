import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

import appCss from "../styles.css?url";
import { BottomNav } from "@/components/iron/BottomNav";
import { Toaster } from "sonner";
import { useAppStore } from "@/store/useAppStore";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0A0A0A" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Iron Coach" },
      { title: "Pedrosa" },
      { name: "description", content: "Acompanhe sua jornada - Pedrosa" },
      { property: "og:title", content: "Pedrosa" },
      { property: "og:description", content: "Acompanhe sua jornada - Pedrosa" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Pedrosa" },
      { name: "twitter:description", content: "Acompanhe sua jornada - Pedrosa" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/78d23bc5-f5ce-46b3-ac76-12f92933bb89/id-preview-74dac8c6--7bd61a08-fb2d-46c3-9ca7-3bfe58aec3b6.lovable.app-1778802099511.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/78d23bc5-f5ce-46b3-ac76-12f92933bb89/id-preview-74dac8c6--7bd61a08-fb2d-46c3-9ca7-3bfe58aec3b6.lovable.app-1778802099511.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const role = useAppStore((s) => s.role);
  const logout = useAppStore((s) => s.logout);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === null && location.pathname !== "/login") {
      navigate({ to: "/login" });
    }
  }, [role, location.pathname, navigate]);

  const onLogin = location.pathname === "/login";
  const showLogout = role !== null && !onLogin;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-[430px] min-h-screen relative pb-28 border-x border-border/40">
          {showLogout && (
            <button
              onClick={() => { logout(); navigate({ to: "/login" }); }}
              className="absolute top-4 right-4 z-40 size-9 rounded-xl bg-card/80 backdrop-blur border border-border grid place-items-center text-muted-foreground"
              aria-label="Sair"
            >
              <LogOut className="size-4" />
            </button>
          )}
          <Outlet />
          {role === "aluno" && <BottomNav />}
        </div>
        <Toaster position="top-center" theme="dark" richColors />
      </div>
    </QueryClientProvider>
  );
}
