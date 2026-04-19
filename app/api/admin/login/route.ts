export async function POST(request: Request) {
  const { password } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Admin password not configured" }, { status: 500 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = Response.json({ success: true });
  const headers = new Headers(response.headers);

  const isProduction = process.env.NODE_ENV === "production";
  const cookieValue = [
    `admin_auth=${process.env.ADMIN_PASSWORD}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${60 * 60 * 24 * 7}`, // 7 days
    isProduction ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  headers.set("Set-Cookie", cookieValue);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
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
