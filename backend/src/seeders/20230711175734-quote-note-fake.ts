"use strict";

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert(
      "QuoteNotes",
      [
        {
          quoteId: "200022",
          content: "Good elevator products and fixtures",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quoteId: "200022",
          content:
            "Transform the look and feel of your elevator cab. Our durable panel kits come in a variety of styles and options. Reversible panels available!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quoteId: "200022",
          content:
            "Durable, eye-catching, and built to accommodate all passengers. Elevate your passenger experience with MAD Fixtures.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quoteId: "200022",
          content:
            "The Touch-To-Go touchscreen system takes the place of conventional push buttons and transforms user-elevator interaction into a dynamic, visual experience.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("QuoteNotes", {}, {});
  },
};
