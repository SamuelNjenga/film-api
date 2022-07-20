const Router = require("express");

const GenreRoutes = require("./GenreRoutes");
const MovieRoutes = require("./MovieRoutes");
const ActorRoutes = require("./ActorRoutes");

const router = Router();

router.use("/genres", GenreRoutes);
router.use("/movies", MovieRoutes);
router.use("/actors", ActorRoutes);

module.exports = router;
