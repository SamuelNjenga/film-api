const Router = require("express");
const movieController = require("../controllers/MovieController");

const router = Router();

router.post("/", movieController.createMovie);
router.get("/", movieController.getMovies);
router.delete("/:id", movieController.deleteMovie);
router.put("/:id", movieController.updateMovie);

module.exports = router;
