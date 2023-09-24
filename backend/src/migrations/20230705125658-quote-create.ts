"use strict";

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("Quotes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quoteId: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      probability: {
        type: DataTypes.STRING,
      },
      projectName: {
        type: DataTypes.STRING,
      },
      units: {
        type: DataTypes.INTEGER,
      },
      value: {
        type: DataTypes.DECIMAL,
      },
      customerName: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      endContractor: {
        type: DataTypes.STRING,
      },
      salesPerson: {
        type: DataTypes.STRING,
      },
      revision: {
        type: DataTypes.STRING,
      },
      projectAddress: {
        type: DataTypes.STRING,
      },
      quoteBy: {
        type: DataTypes.STRING,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
      estAwardDate: {
        type: DataTypes.DATEONLY,
      },
      revisionDate: {
        type: DataTypes.DATEONLY,
      },
      nextFollowUp: {
        type: DataTypes.DATEONLY,
      },
      sysAwardDate: {
        type: DataTypes.DATEONLY,
      },

      attendees: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      reception: {
        type: DataTypes.INTEGER,
      },
      summaryOfMeeting: {
        type: DataTypes.STRING,
      },
      doingRight: {
        type: DataTypes.STRING,
      },
      areasToImprove: {
        type: DataTypes.STRING,
      },
      actionNextSteps: {
        type: DataTypes.STRING,
      },

      city: {
        type: new DataTypes.STRING(125),
      },
      stateName: {
        type: new DataTypes.STRING(125),
      },
      stateCode: {
        type: new DataTypes.STRING(10),
      },
      zipCode: {
        type: new DataTypes.STRING(10),
      },
      streetAddress: {
        type: new DataTypes.STRING(125),
      },
      country: {
        type: new DataTypes.STRING(125),
      },
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("Quotes");
  },
};
