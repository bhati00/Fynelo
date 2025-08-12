// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log('🔍 Middleware running for:', request.nextUrl.pathname);
  const token = request.cookies.get("auth_token")?.value;

  const isAuthPage = request.nextUrl.pathname === "/";
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // If no token and trying to access dashboard → redirect to home/login
  if (!token && isDashboardPage) {
    console.log('🔄 Redirecting to login page');
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If token exists and trying to visit home/login → redirect to dashboard
  if (token && isAuthPage) {
    console.log('🔄 Redirecting to dashboard');
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Otherwise → allow request
  return NextResponse.next();
}

// Limit middleware to specific routes
export const config = {
  matcher: ["/", "/dashboard/:path*"], 
};
