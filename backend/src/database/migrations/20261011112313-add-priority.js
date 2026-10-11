"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high"),
      defaultValue: "low",
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "tasks",
      "priority"
    );
  },
};
