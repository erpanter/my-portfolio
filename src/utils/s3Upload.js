export const uploadToS3 = async (file) => {
  try {
    // 1. Get signed URL from your API
    const res = await fetch(
      "https://c8hqbomoi4.execute-api.ap-southeast-1.amazonaws.com/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fileName: `${Date.now()}-${file.name}`,
          fileType: file.type
        })
      }
    );

    const data = await res.json();

    // 2. Upload directly to S3 using signed URL
    await fetch(data.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type
      },
      body: file
    });

    // 3. Return public URL
    return data.fileUrl;

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
  }
};