const Router = require("express");

const upload = require("../utils/multer.js");

const uploadController = require("../controllers/UploadController");

const router = Router();

router.post(
  "/upload-images",
  upload.array("picture"),
  uploadController.createUpload
);

module.exports = router;
