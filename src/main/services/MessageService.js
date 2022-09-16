const db = require("../db/models/index");

exports.createMessage = async (data) => {
  return db.Message.create(data);
};

exports.updateMessage = async (data, root) => {
  return db.Message.update(data, root);
};

exports.getMessages = async () => {
  return db.Message.findAll();
};

exports.getUnreadMessages = async (data) => {
  return db.Message.findAll(data);
};

exports.deleteMessage = async (data) => {
  return db.Message.destroy(data);
};
