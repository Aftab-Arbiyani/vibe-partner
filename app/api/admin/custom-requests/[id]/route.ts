import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/firebase";
import type { CustomRequest } from "@/lib/skills-data";

const VALID_STATUSES: CustomRequest["status"][] = [
  "pending_payment",
  "pending",
  "completed",
  "cancelled",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const { id } = await params;
  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const ref = db.collection("customRequests").doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    return Response.json({ error: "Request not found" }, { status: 404 });
  }

  await ref.update({ status });
  return Response.json({ success: true });
}
