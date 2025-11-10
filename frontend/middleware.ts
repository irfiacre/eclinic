import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { TOKEN_COOKIE_NAME } from "./constants/fixtures";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get(TOKEN_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  if (["/cases", "/nurses"].includes(pathname) && !tokenCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (tokenCookie && ["/nurses"].includes(pathname)) {
    const userInfo: any = jwtDecode(tokenCookie.value);
    if (userInfo?.nurse.role !== "admin") {
      return NextResponse.redirect(new URL("/cases", request.url));
    }
  }

  if (pathname === "/" && tokenCookie) {
    return NextResponse.redirect(new URL("/cases", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/cases", "/nurses"],
};
