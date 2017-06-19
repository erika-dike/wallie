import cloudinary from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

export default function deleteImageFromCloudinary(url) {
  const publicIdWithExtension = url.split('/').slice(-2).join('/');
  const publicId = publicIdWithExtension.substring(
    0, publicIdWithExtension.indexOf('.'),
  );

  cloudinary.v2.uploader.destroy(
    publicId,
    (error, result) => {
      if (error) {
        // TODO: LOG ERRORS REMOTELY;
        console.log(error);
      } else if (result) {
        // TODO: LOG SUCCESSFUL DELETES
        console.log(result);
      }
    },
  );
}
