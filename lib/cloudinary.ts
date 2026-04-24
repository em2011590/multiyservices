import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadAssetInfo = async (filePath: string, folder: string = 'devsphere') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};
