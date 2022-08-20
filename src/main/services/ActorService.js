const db = require("../db/models/index");

exports.createActor = async (data) => {
  return db.Actor.create(data);
};

exports.updateActor = async (data, root) => {
  return db.Actor.update(data, root);
};

exports.getActors = async (data) => {
  return db.Actor.findAndCountAll(data);
};

exports.getActor = async (data) => {
  return db.Actor.findByPk(data);
};

exports.getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalActors, rows: actors } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalActors / limit);

  return { totalActors, actors, totalPages, currentPage };
};

exports.deleteActor = async (data) => {
  return db.Actor.destroy(data);
};
