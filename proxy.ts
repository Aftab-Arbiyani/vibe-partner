import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHash } from "crypto";

function getExpectedToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(`admin-session:${pw}`).digest("hex");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const expected = getExpectedToken();
  const token = request.cookies.get("admin_auth")?.value;

  if (!expected || token !== expected) {
    if (isAdminApi) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
