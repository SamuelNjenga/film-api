const db = require("../db/models/index");

exports.createMovie = async (data) => {
  return db.Movie.create(data);
};

exports.updateMovie = async (data, root) => {
  return db.Movie.update(data, root);
};

exports.getMovies = async (data) => {
  return db.Movie.findAndCountAll(data);
};

exports.getMovie = async (data) => {
  return db.Movie.findByPk(data);
};

exports.getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalMovies, rows: movies } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalMovies / limit);

  return { totalMovies, movies, totalPages, currentPage };
};

exports.deleteMovie = async (data) => {
  return db.Movie.destroy(data);
};
