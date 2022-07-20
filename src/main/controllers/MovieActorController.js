const movieActorService = require("../services/MovieActorService");
const ReqValidator = require("../utils/validator");

exports.createMovie_Actor = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      movieId: "required|integer",
      actorId: "required|integer",
    });
    if (!valid) return;
    const data = {
      movieId: req.body.movieId,
      actorId: req.body.actorId,
    };
    await movieActorService.createMovie_Actor(data);
    res
      .status(201)
      .json({ data, message: `A new movie_actor has been created` });
  } catch (err) {
    next(err);
  }
};

exports.getMovies_Actors = async (req, res, next) => {
  try {
    const movies_actors = await movieActorService.getMovies_Actors();
    res.status(200).json(movies_actors);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateMovie_Actor = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      movieId: "integer",
      actorId: "integer",
    });
    if (!valid) return;
    const data = {
      movieId: req.body.movieId,
      actorId: req.body.actorId,
    };

    const movieActorId = req.params.id;
    await movieActorService.updateMovie_Actor(data, {
      where: {
        id: movieActorId,
      },
    });
    res
      .status(200)
      .json({ data, message: `Movie_Actor ${movieActorId} has been updated` });
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie_Actor = async (req, res, next) => {
  try {
    const movieActorId = req.params.id;
    await movieActorService.deleteMovie_Actor({
      where: {
        id: movieActorId,
      },
    });
    res.status(200).json({
      message: `Movie_Actor ${movieActorId} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
};
