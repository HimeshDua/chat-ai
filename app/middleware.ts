import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthSession } from "../lib/auth";

const protectedRoutes = ["/dashboard", "/settings", "/chat"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const session = await getAuthSession();

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/auth/signin"; // or redirect to custom signin page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/chat/:path*"],
};
