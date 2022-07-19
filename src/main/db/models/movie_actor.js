"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie_Actor.belongsTo(models.Movie, {
        foreignKey: {
          name: "movieId",
          allowNull: false,
        },
      });
      Movie_Actor.belongsTo(models.Actor, {
        foreignKey: {
          name: "actorId",
          allowNull: false,
        },
      });
    }
  }
  Movie_Actor.init(
    {
      actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "actors", key: "id" },
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "movies", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Movie_Actor",
    }
  );
  return Movie_Actor;
};
