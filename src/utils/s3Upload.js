const UPLOAD_URL =
  "https://c8hqbomoi4.execute-api.ap-southeast-1.amazonaws.com/upload";

export const uploadToS3 = async (file) => {
  const signedUrlResponse = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: `${Date.now()}-${file.name}`,
      fileType: file.type,
    }),
  });

  if (!signedUrlResponse.ok) {
    throw new Error("Failed to create an upload URL");
  }

  const { uploadUrl, fileUrl } = await signedUrlResponse.json();
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload the file");
  }

  return fileUrl;
};
