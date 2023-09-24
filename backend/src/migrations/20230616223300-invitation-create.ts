"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes }  from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("Invitations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      inviter: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sentAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      expiredAt: {
        type: DataTypes.DATE,
      },
      acceptedAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("Invitations");
  },
};
