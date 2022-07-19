const Router = require("express");
const GenreRoutes = require("./GenreRoutes");
const MovieRoutes = require("./MovieRoutes");

const router = Router();

router.use("/genres", GenreRoutes);
router.use("/movies", MovieRoutes);

module.exports = router;
