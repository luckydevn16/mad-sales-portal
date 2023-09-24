"use strict";

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Kuldeep",
          lastName: "Saini",
          email: "kuldeep.saini@madelevator.com",
          role: "admin",
          status: "active",
          joinedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Steve",
          lastName: "Reich-Rohrwig",
          email: "Steve.Reich-Rohrwig@madelevator.com",
          role: "admin",
          status: "active",
          joinedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Roy",
          lastName: "De Medeiros",
          email: "Roy.DeMedeiros@madelevator.com",
          role: "admin",
          status: "active",
          joinedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete(
      "Users",
      {
        email: "kuldeep.saini@madelevator.com",
      },
      {}
    );
  },
};
