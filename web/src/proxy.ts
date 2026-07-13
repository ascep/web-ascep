import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createNextIntlMiddleware from "next-intl/middleware";

type Category = "RICK" | "IPUC" | "TEAPOT";

const DESTINATIONS: Record<Category, string> = {
  RICK: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  IPUC: "https://www.youtube.com/watch?v=q3WQ9nk7ZhU",
  TEAPOT: "https://http.cat/418",
};

const PATH_CATEGORIES: [string, Category][] = [
  ["/wp-", "RICK"],
  ["/xmlrpc", "TEAPOT"],
  ["/admin.php", "TEAPOT"],
  ["/administrator", "TEAPOT"],
  ["/admin", "RICK"],
  ["/manager", "IPUC"],
  ["/backend", "IPUC"],
  ["/cpanel", "IPUC"],
  ["/cp", "IPUC"],
  ["/whm", "RICK"],
  ["/webmail", "IPUC"],
  ["/plesk", "TEAPOT"],
  ["/directadmin", "TEAPOT"],
  ["/phpmyadmin", "RICK"],
  ["/pma", "RICK"],
  ["/mysql", "IPUC"],
  ["/sql-backup", "RICK"],
  ["/sql", "IPUC"],
  ["/database", "TEAPOT"],
  ["/db", "IPUC"],
  ["/.env", "RICK"],
  ["/env", "RICK"],
  ["/.git", "TEAPOT"],
  ["/configuration", "IPUC"],
  ["/settings", "IPUC"],
  ["/backup", "IPUC"],
  ["/backups", "IPUC"],
  ["/config", "IPUC"],
  ["/dump", "RICK"],
  ["/shell", "TEAPOT"],
  ["/cmd", "TEAPOT"],
  ["/exec", "TEAPOT"],
  ["/terminal", "TEAPOT"],
  ["/ssh", "IPUC"],
  ["/ftp", "IPUC"],
  ["/hacker", "IPUC"],
  ["/hack", "IPUC"],
  ["/exploit", "RICK"],
  ["/malware", "IPUC"],
  ["/virus", "IPUC"],
  ["/injection", "IPUC"],
  ["/sqli", "TEAPOT"],
  ["/xss", "TEAPOT"],
  ["/csrf", "TEAPOT"],
  ["/debug", "TEAPOT"],
  ["/test", "TEAPOT"],
  ["/logs", "RICK"],
  ["/error", "TEAPOT"],
  ["/info", "IPUC"],
  ["/phpinfo", "IPUC"],
  ["/filemanager", "RICK"],
  ["/files", "IPUC"],
  ["/uploads", "IPUC"],
  ["/install", "RICK"],
  ["/setup", "TEAPOT"],
  ["/wizard", "IPUC"],
  ["/owa", "IPUC"],
  ["/exchange", "IPUC"],
  ["/remote", "IPUC"],
  ["/rdp", "IPUC"],
  ["/proxy", "TEAPOT"],
  ["/cgi-bin", "RICK"],
  ["/graphql", "TEAPOT"],
  ["/swagger", "IPUC"],
  ["/api-docs", "IPUC"],
];

const ASCII_RESPONSES: Record<Category, string> = {
  RICK: [
    "┌──────────────────────────────────────────────┐",
    "│                                              │",
    "│   NEVER GONNA GIVE YOU UP                    │",
    "│                                              │",
    "│  We're no strangers to love                  │",
    "│  You know the rules and so do I              │",
    "│  A full commitment's what I'm thinking of    │",
    "│  You wouldn't get this from any other guy    │",
    "│                                              │",
    "│  https://youtu.be/dQw4w9WgXcQ               │",
    "│                                              │",
    "└──────────────────────────────────────────────┘",
  ].join("\n"),
  IPUC: [
    "┌──────────────────────────────────────────────┐",
    "│                                              │",
    "│   JUZGADO Y ENCONTRADO FALTA                 │",
    "│                                              │",
    '│  "Todo aquel que hace lo malo aborrece      │',
    "│   la luz, y no viene a la luz, para que     │",
    '│   sus obras no sean reprochadas."           │',
    "│                               — Juan 3:20    │",
    "│                                              │",
    "│  Porque de tal manera amó Dios al mundo      │",
    "│  que ha dado a su Hijo unigénito, para que   │",
    "│  todo aquel que en Él cree, no se pierda,    │",
    "│  mas tenga vida eterna.                      │",
    "│                               — Juan 3:16    │",
    "│                                              │",
    "└──────────────────────────────────────────────┘",
  ].join("\n"),
  TEAPOT: [
    "┌──────────────────────────────────────────────┐",
    "│                                              │",
    "│   418 I'M A TEAPOT                           │",
    "│                                              │",
    "│  Hyper Text Coffee Pot Control Protocol      │",
    "│                                              │",
    "│  The server refuses to brew coffee           │",
    "│  because it is, permanently, a teapot.       │",
    "│                                              │",
    "│  https://http.cat/418                        │",
    "│                                              │",
    "└──────────────────────────────────────────────┘",
  ].join("\n"),
};

function getCategory(pathname: string): Category | null {
  for (const [prefix, cat] of PATH_CATEGORIES) {
    if (pathname.startsWith(prefix)) {
      return cat;
    }
  }
  return null;
}

function isTerminal(request: NextRequest): boolean {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const accept = request.headers.get("accept") || "";

  const noUA =
    !ua ||
    ua.includes("curl") ||
    ua.includes("wget") ||
    ua.includes("httpie") ||
    ua.includes("python-requests") ||
    ua.includes("go-http-client") ||
    ua.includes("ruby") ||
    ua.startsWith("libcurl");

  const noHTMLAccept = !accept.includes("text/html");

  return noUA || noHTMLAccept;
}

const nextIntlMiddleware = createNextIntlMiddleware({
  locales: ["es", "en", "pt"],
  defaultLocale: "es",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const category = getCategory(pathname);

  if (category) {
    if (isTerminal(request)) {
      return new NextResponse(ASCII_RESPONSES[category] + "\n", {
        status: 418,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }
    return NextResponse.redirect(new URL(DESTINATIONS[category]));
  }

  return nextIntlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/wp-(.*)",
    "/admin/:path*",
    "/.git/:path*",
    "/cgi-bin/:path*",
  ],
};
