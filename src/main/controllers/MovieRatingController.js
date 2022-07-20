const movieRatingService = require("../services/MovieRatingService");

const ReqValidator = require("../utils/validator");

exports.createMovie_Rating = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      movieId: "required|integer",
      actorId: "required|integer",
      rating: "required|integer",
    });
    if (!valid) return;
    const data = {
      movieId: req.body.movieId,
      actorId: req.body.actorId,
      rating: req.body.rating,
    };
    await movieRatingService.createMovie_Rating(data);
    res
      .status(201)
      .json({ data, message: `A new movie_rating has been created` });
  } catch (err) {
    next(err);
  }
};

exports.getMovies_Ratings = async (req, res, next) => {
  try {
    const movies_ratings = await movieRatingService.getMovies_Ratings();
    res.status(200).json(movies_ratings);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateMovie_Rating = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      movieId: "integer",
      actorId: "integer",
      rating: "integer",
    });
    if (!valid) return;
    const data = {
      movieId: req.body.movieId,
      actorId: req.body.actorId,
      rating: req.body.rating,
    };

    const movieRatingId = req.params.id;
    await movieRatingService.updateMovie_Rating(data, {
      where: {
        id: movieRatingId,
      },
    });
    res.status(200).json({
      data,
      message: `Movie_Rating ${movieRatingId} has been updated`,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie_Rating = async (req, res, next) => {
  try {
    const movieRatingId = req.params.id;
    await movieRatingService.deleteMovie_Rating({
      where: {
        id: movieRatingId,
      },
    });
    res.status(200).json({
      message: `Movie_Rating ${movieRatingId} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
};
