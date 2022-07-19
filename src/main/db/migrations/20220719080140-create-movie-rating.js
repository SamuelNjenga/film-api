"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movie_Ratings", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      actorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "actors", key: "id" },
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "movies", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movie_Ratings");
  },
};
