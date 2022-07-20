const Router = require("express");

const GenreRoutes = require("./GenreRoutes");
const MovieRoutes = require("./MovieRoutes");
const MovieActorRoutes = require("./MovieActorRoutes");
const ActorRoutes = require("./ActorRoutes");

const router = Router();

router.use("/genres", GenreRoutes);
router.use("/movies", MovieRoutes);
router.use("/actors", ActorRoutes);
router.use("/movies-actors", MovieActorRoutes);

module.exports = router;
