const db = require("../db/models/index");

exports.createMovie_Rating = async (data) => {
  return db.Movie_Rating.create(data);
};

exports.updateMovie_Rating = async (data, root) => {
  return db.Movie_Rating.update(data, root);
};

exports.getMovies_Ratings = async () => {
  return db.Movie_Rating.findAll();
};

exports.getMovie_Rating = async (data) => {
  return db.Movie_Rating.findByPk(data);
};

exports.deleteMovie_Rating = async (data) => {
  return db.Movie_Rating.destroy(data);
};
