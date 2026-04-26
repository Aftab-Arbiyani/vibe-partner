import { getSkillById } from "@/lib/skills-data";
import { generateSignedUrl } from "@/lib/storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ skillId: string }> }
) {
  const { skillId } = await params;

  const skill = await getSkillById(skillId);

  if (!skill) {
    return Response.json({ error: "Skill not found" }, { status: 404 });
  }

  if (skill.isPremium) {
    return Response.json({ error: "This skill requires purchase" }, { status: 403 });
  }

  const downloadUrl = await generateSignedUrl(skill.fileUrl, 10 * 60 * 1000);

  // Redirect directly to the signed URL so the browser triggers a download
  return Response.redirect(downloadUrl, 302);
}
