const Router = require("express");

const actorController = require("../controllers/ActorController");

const router = Router();

router.post("/", actorController.createActor);
router.get("/", actorController.getActors);
router.delete("/:id", actorController.deleteActor);
router.put("/:id", actorController.updateActor);

module.exports = router;
