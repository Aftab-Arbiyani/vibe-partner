import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/firebase";
import type { CustomRequest } from "@/lib/skills-data";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;

  const snap = await db.collection("customRequests").get();
  const requests = snap.docs.map((doc) => doc.data() as CustomRequest);
  return Response.json(requests);
}
