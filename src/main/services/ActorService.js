const db = require("../db/models/index");

exports.createActor = async (data) => {
  return db.Actor.create(data);
};

exports.updateActor = async (data, root) => {
  return db.Actor.update(data, root);
};

exports.getActors = async () => {
  return db.Actor.findAll();
};

exports.getActor = async (data) => {
  return db.Actor.findByPk(data);
};

exports.deleteActor = async (data) => {
  return db.Actor.destroy(data);
};
