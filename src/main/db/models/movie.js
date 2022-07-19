"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, {
        foreignKey: {
          name: "genreId",
          allowNull: false,
        },
      });
      Movie.hasMany(models.Movie_Actor, {
        onDelete: "restrict",
        foreignKey: {
          name: "movieId",
          allowNull: false,
        },
      });
    }
  }
  Movie.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      language: { type: DataTypes.STRING, allowNull: false },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "genres", key: "id" },
      },
      releaseDate: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
