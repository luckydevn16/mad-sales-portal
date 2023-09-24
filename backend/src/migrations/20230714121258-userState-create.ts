"use strict";

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("UserStates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      stateId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "States", key: "id" },
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("UserStates");
  },
};
