const Router = require("express");

const messageController = require("../controllers/MessageController");

const router = Router();

router.post("/", messageController.createMessage);
router.get("/", messageController.getMessages);
router.get("/:id/message", messageController.getUnreadMessages);
router.get("/:id/message-all", messageController.getReadUnreadMessages);

module.exports = router;
