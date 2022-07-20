const Router = require("express");
const movieRatingController = require("../controllers/MovieRatingController");

const router = Router();

router.post("/", movieRatingController.createMovie_Rating);
router.get("/", movieRatingController.getMovies_Ratings);
router.delete("/:id", movieRatingController.deleteMovie_Rating);
router.put("/:id", movieRatingController.updateMovie_Rating);

module.exports = router;
