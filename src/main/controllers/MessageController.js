const { sequelize } = require("../db/models");

const messageService = require("../services/MessageService");

const ReqValidator = require("../utils/validator");

exports.createMessage = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      message: "required",
      actorId: "required|integer",
    });
    if (!valid) return;
    const data = {
      message: req.body.message,
      actorId: req.body.actorId,
      read: req.body.read,
    };

    await messageService.createMessage(data, transaction);

    await transaction.commit();

    res.status(201).json({ data, message: `A new message has been created` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getMessages();
    res.status(200).json(messages);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.getUnreadMessages = async (req, res, next) => {
  try {
    const actorId = req.params.id;
    const messages = await messageService.getUnreadMessages({
      where: {
        actorId: actorId,
        read: false,
      },
    });
    res.status(200).json(messages);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};
