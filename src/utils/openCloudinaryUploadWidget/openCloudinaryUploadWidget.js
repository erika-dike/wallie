const cloudinary = global.cloudinary;


export default function openCloudinaryUploadWidget() {
  return new Promise((resolve, reject) => {
    cloudinary.openUploadWidget({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      tags: ['profile_pic'],
    }, (error, result) => {
      if (result) {
        resolve(result[0].secure_url);
      } else if (error) {
        reject(error.message);
      }
    });
  });
}
