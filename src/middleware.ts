import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Force Node.js runtime
export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // If it's an admin path
  if (path.startsWith("/admin")) {
    // Exclude the login page from protection
    if (path === "/admin/login") {
      return NextResponse.next();
    }

    try {
      const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // Redirect to login if not authenticated
      if (!session) {
        const url = new URL("/admin/login", request.url);
        url.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(url);
      }

      // Optional: Check if user is an admin
      if (session.isAdmin !== true) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Fall back to redirecting to login on any error
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
