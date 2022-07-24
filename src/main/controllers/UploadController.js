const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.createUpload = async (req, res, next) => {
  try {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinary.uploader.upload(path, {
        resource_type: "auto",
        folder: "film_assets",
      });
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      message: "images uploaded successfully",
      data: urls,
    });
  } catch (err) {
    next(err);
  }
};
