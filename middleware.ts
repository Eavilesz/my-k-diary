import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    if (path === "/admin/login") {
      return NextResponse.next();
    }

    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token || !token.isAdmin) {
        const url = new URL("/admin/login", request.url);
        url.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
