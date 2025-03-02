import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/api/helper";

const publicPaths = ["/login"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(path);
  const sessionCookie = request.cookies.get("session")?.value;

  // Accessing restricted route without a sessionCookie
  if (!isPublicPath && !sessionCookie) {
    // Redirect to login page keeping the current path for redirection back post login
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (sessionCookie) {
    try {
      const isValid = await verifyToken(sessionCookie);

      if (!isValid && !isPublicPath) {
        // Redirect to login page keeping the current path for redirection back post login
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("callbackUrl", path);
        return NextResponse.redirect(redirectUrl);
      }

      // If valid token but on login page, redirect to home
      if (isValid && isPublicPath && path === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (e) {
      // If token verification fails, treat as invalid
      if (!isPublicPath) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("callbackUrl", path);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  };