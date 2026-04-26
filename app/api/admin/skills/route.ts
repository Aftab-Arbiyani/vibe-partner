import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/firebase";
import type { Skill } from "@/lib/skills-data";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;

  const snap = await db.collection("skills").get();
  const skills = snap.docs.map((doc) => doc.data() as Skill);
  return Response.json(skills);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const body = await request.json();
  const { title, description, tags, isPremium, price, fileUrl, type } = body;

  if (!title || !description || !fileUrl) {
    return Response.json({ error: "title, description, and fileUrl are required" }, { status: 400 });
  }

  const skill: Skill = {
    id: crypto.randomUUID(),
    title: String(title).trim(),
    description: String(description).trim(),
    tags: Array.isArray(tags) ? tags.map(String) : [],
    isPremium: Boolean(isPremium),
    price: isPremium ? Math.max(0, Number(price) || 0) : 0,
    fileUrl: String(fileUrl),
    type: type === "agent" ? "agent" : "skill",
    createdAt: new Date().toISOString(),
  };

  await db.collection("skills").doc(skill.id).set(skill);
  return Response.json(skill, { status: 201 });
}
