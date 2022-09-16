const Router = require("express");

const messageController = require("../controllers/MessageController");

const router = Router();

router.post("/", messageController.createMessage);
router.get("/", messageController.getMessages);

module.exports = router;