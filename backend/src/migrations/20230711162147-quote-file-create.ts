"use strict";

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes }  from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("QuoteFiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quoteId: {
        type: DataTypes.INTEGER,
      },
      orgName: {
        type: DataTypes.STRING,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      fileSize: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("QuoteFiles");
  },
};

