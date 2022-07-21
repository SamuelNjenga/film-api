const { sequelize } = require("../db/models");

const actorService = require("../services/ActorService");
const CLIENT_PHONE_NUMBER = "+254740700076";

const ReqValidator = require("../utils/validator");
const sendSms = require("../utils/twilio");

exports.createActor = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      firstName: "required|string",
      lastName: "required|string",
      email: "required|string",
      phoneNumber: "required|string",
    });
    if (!valid) return;
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    await actorService.createActor(data);
    sendSms(
      CLIENT_PHONE_NUMBER,
      `Thanks ${data.firstName}  ${data.lastName} for creating an account in our system. You can now go ahead and log on to the system.`
    );
    res.status(201).json({ data, message: `A new actor has been created` });
  } catch (err) {
    next(err);
  }
};

exports.getActors = async (req, res, next) => {
  try {
    const actors = await actorService.getActors();
    res.status(200).json(actors);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateActor = async (req, res, next) => {
  try {
    const valid = await ReqValidator.validate(req, res, {
      firstName: "string",
      lastName: "string",
      email: "string",
      phoneNumber: "string",
    });
    if (!valid) return;
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    const actorId = req.params.id;
    await actorService.updateActor(data, {
      where: {
        id: actorId,
      },
    });
    res
      .status(200)
      .json({ data, message: `Actor ${actorId} has been updated` });
  } catch (err) {
    next(err);
  }
};

exports.deleteActor = async (req, res, next) => {
  try {
    const actorId = req.params.id;
    await actorService.deleteActor({
      where: {
        id: actorId,
      },
    });
    res.status(200).json({
      message: `Actor ${actorId} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
};
