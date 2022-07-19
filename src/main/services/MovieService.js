const db = require("../db/models/index");

exports.createMovie = async (data) => {
  return db.Movie.create(data);
};

exports.updateMovie = async (data, root) => {
  return db.Movie.update(data, root);
};

exports.getMovies = async () => {
  return db.Movie.findAll();
};

exports.getMovie = async (data) => {
  return db.Movie.findByPk(data);
};

exports.deleteMovie = async (data) => {
  return db.Movie.destroy(data);
};
