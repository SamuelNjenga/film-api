const { sequelize } = require("../db/models");

const movieService = require("../services/MovieService");

const ReqValidator = require("../utils/validator");

exports.createMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
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

    await movieService.createMovie(data, transaction);

    await transaction.commit();

    res.status(201).json({ data, message: `A new movie has been created` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getMovies = async (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = movieService.getPagination(page, size);
  try {
    const movies = await movieService.getMovies({ limit, offset });
    const updatedMovies = movieService.getPagingData(movies, page, limit);
    res.status(200).json(updatedMovies);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
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

    const movie = await movieService.getMovie(movieId);

    if (!movie) {
      await transaction.commit();
      return res
        .status(200)
        .json({ message: `Movie ${movieId} does not exist in our database` });
    }

    await movieService.updateMovie(
      data,
      {
        where: {
          id: movieId,
        },
      },
      transaction
    );
    await transaction.commit();
    res
      .status(200)
      .json({ data, message: `Movie ${movieId} has been updated` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const movieId = req.params.id;
    const movie = await movieService.getMovie(movieId);

    if (!movie) {
      await transaction.commit();
      return res
        .status(200)
        .json({ message: `Movie ${movieId} does not exist in our database` });
    }

    await movieService.deleteMovie(
      {
        where: {
          id: movieId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `Movie ${movieId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
