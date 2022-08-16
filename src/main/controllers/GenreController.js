const { sequelize } = require("../db/models");

const genreService = require("../services/GenreService");

const ReqValidator = require("../utils/validator");

exports.createGenre = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };
    await genreService.createGenre(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new genre has been created` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getGenres = async (req, res, next) => {
  try {
    const genres = await genreService.getGenres();
    res.status(200).json(genres);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateGenre = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };

    const genreId = req.params.id;
    await genreService.updateGenre(data, {
      where: {
        id: genreId,
      },
    });
    res
      .status(200)
      .json({ data, message: `Genre ${genreId} has been updated` });
  } catch (err) {
    next(err);
  }
};

exports.deleteGenre = async (req, res, next) => {
  try {
    const genreId = req.params.id;
    await genreService.deleteGenre({
      where: {
        id: genreId,
      },
    });
    res.status(200).json({
      message: `Genre ${genreId} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
};
