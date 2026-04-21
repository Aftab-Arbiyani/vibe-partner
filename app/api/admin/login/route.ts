import { createHash } from "crypto";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Admin password not configured" }, { status: 500 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createHash("sha256")
    .update(`admin-session:${process.env.ADMIN_PASSWORD}`)
    .digest("hex");

  const isProduction = process.env.NODE_ENV === "production";
  const cookieValue = [
    `admin_auth=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${60 * 60 * 24 * 7}`,
    isProduction ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Set-Cookie": cookieValue },
  });
}

export async function DELETE() {
  const headers = new Headers();
  headers.set(
    "Set-Cookie",
    "admin_auth=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
  );
  return new Response(JSON.stringify({ success: true }), { status: 200, headers });
}
