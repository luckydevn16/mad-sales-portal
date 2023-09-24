"use strict";

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert(
      "QuoteFiles",
      [
        {
          quoteId: "200022",
          orgName: "200022-rev-0.pdf",
          fileName: "200022-rev-0.pdf",
          fileSize: 92345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quoteId: "200022",
          orgName: "200022-rev-1.pdf",
          fileName: "200022-rev-1.pdf",
          fileSize: 1371239,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quoteId: "200022",
          orgName: "200022-rev-2.pdf",
          fileName: "200022-rev-2.pdf",
          fileSize: 1464634,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("QuoteFiles", {}, {});
  },
};
