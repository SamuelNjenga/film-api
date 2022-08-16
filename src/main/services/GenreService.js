const db = require("../db/models/index");

exports.createGenre = async (data) => {
  return db.Genre.create(data);
};

exports.updateGenre = async (data, root) => {
  return db.Genre.update(data, root);
};

exports.getGenres = async () => {
  return db.Genre.findAll();
};

exports.getGenre = async (data) => {
  return db.Genre.findByPk(data);
};

exports.deleteGenre = async (data) => {
  return db.Genre.destroy(data);
};
