import { getPurchaseBySessionId, getSkillById } from "@/lib/skills-data";
import { generateSignedUrl } from "@/lib/storage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return Response.json({ error: "session_id is required" }, { status: 400 });
  }

  const purchase = await getPurchaseBySessionId(sessionId);

  if (!purchase) {
    // Webhook may not have fired yet — client should retry
    return Response.json({ status: "pending" }, { status: 202 });
  }

  const skill = await getSkillById(purchase.skillId);
  if (!skill) {
    return Response.json({ error: "Skill not found" }, { status: 404 });
  }

  // Fresh 10-minute signed URL for the success page auto-download
  const downloadUrl = await generateSignedUrl(skill.fileUrl, 10 * 60 * 1000);

  return Response.json({
    status: "ready",
    downloadUrl,
    skillTitle: skill.title,
  });
}
