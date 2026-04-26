import { requireAdmin } from "@/lib/admin-auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/lib/firebase";
import type { Skill } from "@/lib/skills-data";

function getS3Client() {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS credentials.");
  }
  return new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string | null)?.trim();
  const description = (formData.get("description") as string | null)?.trim();
  const tagsRaw = (formData.get("tags") as string | null) ?? "";
  const isPremium = formData.get("isPremium") === "true";
  const priceRaw = formData.get("price") as string | null;
  const type = (formData.get("type") as string | null) === "agent" ? "agent" : "skill";

  if (!file || !title || !description) {
    return Response.json({ error: "title, description, and file are required" }, { status: 400 });
  }

  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) {
    return Response.json({ error: "AWS_S3_BUCKET is not configured" }, { status: 500 });
  }

  const key = `skills/${file.name}`;
  const contentType = file.type || "text/plain";

  const buffer = Buffer.from(await file.arrayBuffer());
  const client = getS3Client();
  await client.send(
    new PutObjectCommand({ Bucket: bucket, Key: key, Body: buffer, ContentType: contentType })
  );

  const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
  const price = isPremium ? Math.round(parseFloat(priceRaw ?? "0") * 100) : 0;

  const skill: Skill = {
    id: crypto.randomUUID(),
    title,
    description,
    tags,
    isPremium,
    price,
    type,
    fileUrl: key,
    createdAt: new Date().toISOString(),
  };

  await db.collection("skills").doc(skill.id).set(skill);
  return Response.json(skill, { status: 201 });
}
