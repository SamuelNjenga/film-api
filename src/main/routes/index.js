const Router = require("express");

const GenreRoutes = require("./GenreRoutes");
const MovieRoutes = require("./MovieRoutes");
const ActorRoutes = require("./ActorRoutes");
const MovieActorRoutes = require("./MovieActorRoutes");
const MovieRatingRoutes = require("./MovieRatingRoutes");


const router = Router();

router.use("/genres", GenreRoutes);
router.use("/movies", MovieRoutes);
router.use("/actors", ActorRoutes);
router.use("/movies-actors", MovieActorRoutes);
router.use("/movies-ratings", MovieRatingRoutes);

module.exports = router;
