import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";

function getS3Client() {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing AWS credentials. Set AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY in your .env file."
    );
  }

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

/**
 * Generates a short-lived presigned GET URL for an S3 object.
 * - If filePath is already an https:// URL it is returned as-is.
 * - filePath should be the S3 object key, e.g. "skills/my-skill.md".
 * - Requires AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET env vars.
 */
export async function generateSignedUrl(
  filePath: string,
  expiresInMs = 10 * 60 * 1000 // 10 minutes default
): Promise<string> {
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) {
    throw new Error(
      "AWS_S3_BUCKET env var is not set. Add it to your .env file."
    );
  }

  const client = getS3Client();
  const filename = filePath.split("/").pop() ?? filePath;
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: filePath,
    ResponseContentDisposition: `attachment; filename="${filename}"`,
  });

  const expiresInSeconds = Math.ceil(expiresInMs / 1000);
  const url = await awsGetSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  return url;
}

/**
 * Generates a short-lived presigned PUT URL for uploading a file to S3.
 * - key should be the S3 object key, e.g. "skills/abc123.md".
 * - Requires AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET env vars.
 */
export async function generateUploadUrl(
  key: string,
  contentType: string,
  expiresInMs = 5 * 60 * 1000 // 5 minutes
): Promise<string> {
  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) {
    throw new Error("AWS_S3_BUCKET env var is not set.");
  }

  const client = getS3Client();
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
  return awsGetSignedUrl(client, command, { expiresIn: Math.ceil(expiresInMs / 1000) });
}
