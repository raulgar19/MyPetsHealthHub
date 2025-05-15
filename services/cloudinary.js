import axios from "axios";
import { Platform } from "react-native";

const cloudinaryConfig = {
  preset_name: "ml_default",
  cloud_name: "dlr8f0kox",
};

export const uploadImageToCloudinary = async (imageUri) => {
  if (Platform.OS === "web") {
    const data = new FormData();
    data.append("file", imageUri);
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
  }
  if (Platform.OS !== "web") {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    });
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
  }
};
