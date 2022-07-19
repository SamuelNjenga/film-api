const Router = require("express");
const GenreRoutes = require("./GenreRoutes");

const router = Router();

router.use("/genres", GenreRoutes);

module.exports = router;
