const { sequelize } = require("../db/models");

const movieService = require("../services/MovieService");

const ReqValidator = require("../utils/validator");

exports.createMovie = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      title: "required|string",
      language: "required|string",
      genreId: "required|integer",
      releaseDate: "required",
    });
    if (!valid) return;
    const data = {
      title: req.body.title,
      language: req.body.language,
      genreId: req.body.genreId,
      releaseDate: req.body.releaseDate,
    };
    await movieService.createMovie(data);
    res.status(201).json({ data, message: `A new movie has been created` });
  } catch (err) {
    next(err);
  }
};

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      title: "string",
      language: "string",
      genreId: "integer",
    });
    if (!valid) return;
    const data = {
      title: req.body.title,
      language: req.body.language,
      genreId: req.body.genreId,
      releaseDate: req.body.releaseDate,
    };
    const movieId = req.params.id;
    await movieService.updateMovie(data, {
      where: {
        id: movieId,
      },
    });
    res
      .status(200)
      .json({ data, message: `Movie ${movieId} has been updated` });
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    await movieService.deleteMovie({
      where: {
        id: movieId,
      },
    });
    res.status(200).json({
      message: `Movie ${movieId} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
};
