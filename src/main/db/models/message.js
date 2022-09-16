"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Actor, {
        foreignKey: {
          name: "actorId",
          allowNull: false,
        },
      });
    }
  }
  Message.init(
    {
      message: { type: DataTypes.TEXT, allowNull: false },
      actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: {
          model: "actors",
          key: "id",
        },
      },
      read: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
