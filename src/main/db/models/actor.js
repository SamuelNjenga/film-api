"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actor.hasMany(models.Movie_Actor, {
        onDelete: "restrict",
        foreignKey: {
          name: "actorId",
          allowNull: false,
        },
      });
      Actor.hasMany(models.Movie_Rating, {
        onDelete: "restrict",
        foreignKey: {
          name: "actorId",
          allowNull: false,
        },
      });
    }
  }
  Actor.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Actor",
    }
  );
  return Actor;
};
