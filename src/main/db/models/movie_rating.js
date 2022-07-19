"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      Movie_Rating.belongsTo(models.Movie, {
        foreignKey: {
          name: "movieId",
          allowNull: false,
        },
      });
      Movie_Rating.belongsTo(models.Actor, {
        foreignKey: {
          name: "actorId",
          allowNull: false,
        },
      });
    }
  }
  Movie_Rating.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      rating: { type: Sequelize.INTEGER, allowNull: false },
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
      modelName: "Movie_Rating",
    }
  );
  return Movie_Rating;
};
