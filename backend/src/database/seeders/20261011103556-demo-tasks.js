"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("tasks", [
      {
        title: "WEB-1",
        description:
          "make more pretty design, mb with more ligth pink shades",
        is_done: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "WEB-2",
        description: "To run first seeder and make it works all correct",
        is_done: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "WEB-10",
        description: "",
        is_done: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
