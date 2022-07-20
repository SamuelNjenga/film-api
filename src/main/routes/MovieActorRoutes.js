const Router = require("express");
const movieActorController = require("../controllers/MovieActorController");

const router = Router();

router.post("/", movieActorController.createMovie_Actor);
router.get("/", movieActorController.getMovies_Actors);
router.delete("/:id", movieActorController.deleteMovie_Actor);
router.put("/:id", movieActorController.updateMovie_Actor);

module.exports = router;
