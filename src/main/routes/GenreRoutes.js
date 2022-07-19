const Router = require("express");
const genreController = require("../controllers/GenreController");

const router = Router();

router.post("/", genreController.createGenre);
router.get("/", genreController.getGenres);
router.delete("/:id", genreController.deleteGenre);
router.put("/:id", genreController.updateGenre);

module.exports = router;
