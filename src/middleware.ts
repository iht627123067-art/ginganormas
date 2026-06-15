import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_EMAIL = "luana.s.faria@gestao.gov.br";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Obter o cookie de sessão do GingaNormas
  const sessionCookie = request.cookies.get("ginga_session");
  const email = sessionCookie?.value;

  const isLoggedIn = email === ALLOWED_EMAIL;

  // 2. Redirecionar usuários não autenticados para a página de login
  if (!isLoggedIn && pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirecionar usuários já autenticados que tentarem acessar a página de login para o dashboard
  if (isLoggedIn && pathname === "/login") {
    const dashboardUrl = new URL("/marco-conceitual", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Configura o matcher do Next.js para interceptar todas as rotas públicas,
// mas ignorando arquivos do Next.js, APIs públicas e formatos de imagem/estilo comuns.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|css|js)$).*)",
  ],
};
