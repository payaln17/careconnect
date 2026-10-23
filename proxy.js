import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

async function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Patient dashboard protection
  if (pathname.startsWith("/patient/dashboard")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const payload = await verifyToken(token);

    if (!payload || payload.role !== "patient") {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  // Doctor dashboard protection
  if (pathname.startsWith("/doctor/dashboard")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const payload = await verifyToken(token);

    if (!payload || payload.role !== "doctor") {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/patient/dashboard/:path*",
    "/doctor/dashboard/:path*",
  ],
};