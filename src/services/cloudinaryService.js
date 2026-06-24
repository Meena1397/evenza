// Service to handle image uploads via Cloudinary
// Supports mock fallback if no credentials are configured
export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

  if (!cloudName || !uploadPreset) {
    console.log("Cloudinary not configured. Simulating upload with dummy URL.");
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a high quality abstract event cover from Unsplash
        resolve("https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60");
      }, 1000);
    });
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error("Upload failed.");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed, falling back to dummy url", error);
    return "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60";
  }
};
