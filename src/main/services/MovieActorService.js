const db = require("../db/models/index");

exports.createMovie_Actor = async (data) => {
  return db.Movie_Actor.create(data);
};

exports.updateMovie_Actor = async (data, root) => {
  return db.Movie_Actor.update(data, root);
};

exports.getMovies_Actors = async () => {
  return db.Movie_Actor.findAll();
};

exports.getMovie_Actor = async (data) => {
  return db.Movie_Actor.findByPk(data);
};

exports.deleteMovie_Actor = async (data) => {
  return db.Movie_Actor.destroy(data);
};
