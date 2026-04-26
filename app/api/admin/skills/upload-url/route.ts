import { requireAdmin } from "@/lib/admin-auth";
import { generateUploadUrl } from "@/lib/storage";

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const contentType = searchParams.get("contentType") ?? "application/octet-stream";

  if (!filename) {
    return Response.json({ error: "filename is required" }, { status: 400 });
  }

  const ext = filename.includes(".") ? filename.slice(filename.lastIndexOf(".")) : "";
  const key = `skills/${crypto.randomUUID()}${ext}`;

  const uploadUrl = await generateUploadUrl(key, contentType);
  return Response.json({ uploadUrl, key });
}
