const  {CloudinaryStorage} =require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");
// const cloudinary = require('cloudinary').v2;

const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "film_assets",
});

upload = multer({ storage: storage });

module.exports = upload

