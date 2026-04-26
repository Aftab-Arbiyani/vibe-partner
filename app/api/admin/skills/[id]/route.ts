import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/firebase";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const { id } = await params;
  const ref = db.collection("skills").doc(id);
  const doc = await ref.get();

  if (!doc.exists) {
    return Response.json({ error: "Skill not found" }, { status: 404 });
  }

  await ref.delete();
  return Response.json({ success: true });
}
