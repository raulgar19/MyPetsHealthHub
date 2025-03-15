import axios from "axios";

const cloudinaryConfig = {
  preset_name: "ml_default",
  cloud_name: "dlr8f0kox",
};

export const uploadImageToCloudinary = async (imageUri) => {
  const data = new FormData();
  data.append("file", imageUri); // Usar el URI base64 directamente
  data.append("upload_preset", cloudinaryConfig.preset_name);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
