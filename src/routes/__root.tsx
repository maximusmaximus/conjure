import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Conjure" },
      { name: "theme-color", content: "#110e0c" },
      {
        name: "description",
        content: "A shared cauldron. Drop an ingredient. Capture the brew.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,680&family=Outfit:wght@380;520;650&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <p className="made-in">
          <a
            className="made-in-git"
            href="https://github.com/maximusmaximus/conjure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img src="/xeroemoji/svg/1f4bb.svg" alt="" width="16" height="16" />
          </a>
          made with ❤️ in SF by{" "}
          <a href="https://maxi.grok.me" target="_blank" rel="noopener noreferrer">
            maxi.grok.me
          </a>
        </p>
        <Scripts />
      </body>
    </html>
  ),
});
