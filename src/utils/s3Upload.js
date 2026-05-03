import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
  },

  // 🔥 IMPORTANT FIX
  requestChecksumCalculation: "WHEN_REQUIRED"
});

export const uploadToS3 = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET,
    Key: fileName,
    Body: file,
    ContentType: file.type
  });

  await s3.send(command);

  return `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${fileName}`;
};