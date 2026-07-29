import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createNextIntlMiddleware from "next-intl/middleware";

type Category = "RICK" | "IPUC" | "TEAPOT";

const ASCEP_VIDEO = "https://www.youtube.com/watch?v=vQCYzT_u4uM";
const SERMON = "https://www.youtube.com/watch?v=q3WQ9nk7ZhU";

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
    "│   ACCESO AL PANEL DE ADMINISTRACION          │",
    "│                                              │",
    "│  Has descubierto la entrada al backend       │",
    "│  de ASCEP. Panel de control interno.         │",
    "│                                              │",
    "│  " + ASCEP_VIDEO + "        │",
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
    "│  todo aquel que en El cree, no se pierda,    │",
    "│  mas tenga vida eterna.                      │",
    "│                               — Juan 3:16    │",
    "│                                              │",
    "└──────────────────────────────────────────────┘",
  ].join("\n"),
  TEAPOT: [
    "┌──────────────────────────────────────────────┐",
    "│                                              │",
    "│   VULNERABILIDAD DETECTADA                   │",
    "│                                              │",
    "│  Has identificado una posible brecha         │",
    "│  de seguridad en la infraestructura          │",
    "│  de ASCEP.                                   │",
    "│                                              │",
    "│  Dona aqui para fortalecer la seguridad:     │",
    "│  https://ascep.org/es/donar                  │",
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

function getLocale(request: NextRequest): string {
  const al = request.headers.get("accept-language") || "";
  if (al.startsWith("pt")) return "pt";
  return "es";
}

function generatePanelHtml(category: Category, destination: string): string {
  const isTeapot = category === "TEAPOT";

  const badge = isTeapot
    ? '<div class="badge danger">VULNERABILIDAD DETECTADA</div>'
    : '<div class="badge">ACCESO CONCEDIDO</div>';

  const title = isTeapot
    ? "Brecha de Seguridad ASCEP"
    : "Panel de Administracion ASCEP";

  const description = isTeapot
    ? "Has identificado una posible brecha en el sistema de la fundacion ASCEP. Estas a punto de explotar una falla critica en la infraestructura."
    : "Has descubierto la entrada al backend de ASCEP. Estas a punto de acceder al panel de control interno de la fundacion.";

  const backLabel = isTeapot ? "Abortar Mision" : "Volver a ASCEP";
  const goLabel = isTeapot ? "Explotar Vulnerabilidad" : "Ingresar al Panel";
  const goClass = isTeapot ? "btn-danger" : "btn-primary";

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.panel{background:#fff;border-radius:12px;padding:40px;max-width:480px;width:90%;text-align:center;box-shadow:0 24px 48px rgba(0,0,0,0.3)}
.badge{display:inline-block;background:#019E9F;color:#fff;padding:6px 16px;border-radius:4px;font-size:12px;font-weight:600;letter-spacing:1.5px;margin-bottom:20px;text-transform:uppercase}
.badge.danger{background:#EC6620}
h1{font-size:24px;margin-bottom:16px;color:#1a1a1a}
p{font-size:15px;color:#555;line-height:1.6;margin-bottom:24px}
.timer-box{background:#f5f5f5;border-radius:8px;padding:12px;margin-bottom:24px;font-size:14px;color:#666}
.timer{font-size:28px;font-weight:700;color:#019E9F;margin:0 4px}
.timer-box.danger .timer{color:#EC6620}
.actions{display:flex;gap:12px}
.actions a{flex:1;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;transition:all .15s;cursor:pointer}
.btn-outline{border:2px solid #019E9F;color:#019E9F;background:transparent}
.btn-outline:hover{background:#019E9F;color:#fff}
.btn-primary{background:#019E9F;color:#fff;border:none}
.btn-primary:hover{background:#005C5D}
.btn-danger{background:#EC6620;color:#fff;border:none}
.btn-danger:hover{background:#d45510}
</style>
</head>
<body>
<div class="panel">
${badge}
<h1>${title}</h1>
<p>${description}</p>
<div class="timer-box${isTeapot ? ' danger' : ''}">Acceso expira en <span class="timer" id="countdown">15</span> segundos</div>
<div class="actions">
<a href="https://ascep.org" class="btn-outline" id="back-btn">${backLabel}</a>
<a href="${destination}" class="${goClass}" id="go-btn">${goLabel}</a>
</div>
</div>
<script>
(function(){var s=15,c=document.getElementById('countdown'),g=document.getElementById('go-btn'),i=setInterval(function(){s--;c.textContent=s;if(s<=0){clearInterval(i);window.location.href=g.href}},1000)})()
</script>
</body>
</html>`;
}

const nextIntlMiddleware = createNextIntlMiddleware({
  locales: ["es", "en", "pt"],
  defaultLocale: "es",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const category = getCategory(pathname);

  if (category === "IPUC") {
    if (isTerminal(request)) {
      return new NextResponse(ASCII_RESPONSES.IPUC + "\n", {
        status: 418,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return NextResponse.redirect(new URL(SERMON));
  }

  if (category === "RICK") {
    if (isTerminal(request)) {
      return new NextResponse(ASCII_RESPONSES.RICK + "\n", {
        status: 418,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    const html = generatePanelHtml("RICK", ASCEP_VIDEO);
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (category === "TEAPOT") {
    if (isTerminal(request)) {
      return new NextResponse(ASCII_RESPONSES.TEAPOT + "\n", {
        status: 418,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    const locale = getLocale(request);
    const origin = request.nextUrl.origin;
    const donateUrl = `${origin}/${locale}/donar`;
    const html = generatePanelHtml("TEAPOT", donateUrl);
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (request.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/zprimeascep')) {
    return NextResponse.next();
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
