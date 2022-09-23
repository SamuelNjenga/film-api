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
    const messages = await messageService.getReadUnreadMessages({
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

exports.getReadUnreadMessages = async (req, res, next) => {
  try {
    const actorId = req.params.id;
    const messages = await messageService.getReadUnreadMessages({
      where: {
        actorId: actorId,
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

exports.convertToRead = async (req, res, next) => {
  try {
    const data = {
      messageId: req.body.messageId,
      actorId: req.body.actorId,
    };

    const message = await messageService.getMessage(data.messageId);
    if (message.read === true) {
      const allMessages = await messageService.getReadUnreadMessages({
        where: {
          actorId: data.actorId,
        },
      });
      const unreadMessages = await messageService.getReadUnreadMessages({
        where: {
          actorId: data.actorId,
          read: false,
        },
      });
      res.json({
        message: "Message is already read",
        allMessages,
        unreadMessages,
      });
    } else {
      await messageService.updateMessage(
        { read: true },
        {
          where: {
            id: data.messageId,
          },
        }
      );

      const allMessages = await messageService.getReadUnreadMessages({
        where: {
          actorId: data.actorId,
        },
      });
      const unreadMessages = await messageService.getReadUnreadMessages({
        where: {
          actorId: data.actorId,
          read: false,
        },
      });
      res.status(200).json({ allMessages, unreadMessages });
    }
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const data = {
      messageId: req.body.messageId,
      actorId: req.body.actorId,
    };

    const message = await messageService.getMessage(data.messageId);

    if (!message) {
      return res.status(200).json({
        message: `Message ${data.messageId} does not exist in our database`,
      });
    }

    await messageService.deleteMessage({
      where: {
        id: data.messageId,
      },
    });

    const allMessages = await messageService.getReadUnreadMessages({
      where: {
        actorId: data.actorId,
      },
    });
    const unreadMessages = await messageService.getReadUnreadMessages({
      where: {
        actorId: data.actorId,
        read: false,
      },
    });
    res.status(200).json({
      message: `Message ${data.messageId} has been deleted`,
      allMessages,
      unreadMessages,
    });
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};
