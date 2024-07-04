const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tugas-coffeeshop",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error("Only jpg, jpeg, and png files are allowed!"), false);
    }
    cb(null, true);
  },
});

const deleteImage = async (imageUrl) => {
  try {
    const imagePublicId = imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`tugas-coffeeshop/${imagePublicId}`);
  } catch (error) {
    throw new Error("Failed to delete image from Cloudinary");
  }
};

module.exports = { upload, deleteImage };
