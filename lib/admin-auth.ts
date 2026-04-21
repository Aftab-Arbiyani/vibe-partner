import { cookies } from "next/headers";
import { createHash } from "crypto";

export function getAdminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(`admin-session:${pw}`).digest("hex");
}

export async function requireAdmin(): Promise<Response | null> {
  const expected = getAdminToken();
  if (!expected) {
    return Response.json({ error: "Admin not configured" }, { status: 500 });
  }
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  if (token !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
