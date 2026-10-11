"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("tasks", [
      {
        title: "WEB-5",
        description: "make more pretty design, mb with more ligth pink shades",
        is_done: false,
        priority: "high",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "WEB-4",
        description: "To run first seeder and make it works all correct",
        is_done: true,
        priority: "medium",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "WEB-8",
        description: "",
        priority: "medium",
        is_done: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "WEB-11",
        description: "Update serives and controllers",
        is_done: true,
        priority: "high",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
