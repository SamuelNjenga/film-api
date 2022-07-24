const Router = require("express");
const path = require("path");

const upload = require("../utils/multer.js");

const uploadController = require("../controllers/UploadController");

const router = Router();

router.set("views", path.join(__dirname, "../views"));
router.set("view engine", "ejs");

router.post(
  "/upload-images",
  upload.array("picture"),
  uploadController.createUpload
);

router.get("/upload-render", (req, res) => {
  res.render("upload");
});

module.exports = router;
