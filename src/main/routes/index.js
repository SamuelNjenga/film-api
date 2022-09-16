const Router = require("express");

const GenreRoutes = require("./GenreRoutes");
const MovieRoutes = require("./MovieRoutes");
const MessageRoutes = require("./MessageRoutes");
const ActorRoutes = require("./ActorRoutes");
const MovieActorRoutes = require("./MovieActorRoutes");
const MovieRatingRoutes = require("./MovieRatingRoutes");
const UploadRoutes = require("./UploadRoutes");

const router = Router();

router.use("/genres", GenreRoutes);
router.use("/movies", MovieRoutes);
router.use("/messages", MessageRoutes);
router.use("/actors", ActorRoutes);
router.use("/movies-actors", MovieActorRoutes);
router.use("/movies-ratings", MovieRatingRoutes);
router.use("/uploads", UploadRoutes);

module.exports = router;
