"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes }  from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("LoginLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ip: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("LoginLogs");
  },
};
