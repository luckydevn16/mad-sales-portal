"use strict";
import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export default (sequelize: Sequelize) => {
  class Quote extends Model<
    InferAttributes<Quote>,
    InferCreationAttributes<Quote>
  > {
    declare id: CreationOptional<number>;
    declare quoteId: string;
    declare type: string;
    declare status: string | null;
    declare probability: string | null;
    declare projectName: string | null;
    declare units: number | null;
    declare value: number | null;
    declare customerName: string | null;
    declare contact: string | null;
    declare endContractor: string | null;
    declare salesPerson: string | null;
    declare revision: string | null;
    declare projectAddress: string | null;
    declare quoteBy: string | null;
    declare creationDate: Date | null;
    declare estAwardDate: Date | null;
    declare revisionDate: Date | null;
    declare nextFollowUp: Date | null;
    declare sysAwardDate: Date | null;

    declare attendees: string | null;
    declare location: string | null;
    declare reception: number | null;
    declare summaryOfMeeting: string | null;
    declare doingRight: string | null;
    declare areasToImprove: string | null;
    declare actionNextSteps: string | null;

    declare city: string | null;
    declare stateName: string | null;
    declare stateCode: string | null;
    declare zipCode: string | null;
    declare streetAddress: string | null;
    declare country: string | null;

    static associate(models: DB) {
      models.Quote.hasOne(models.State, {
        as: "state",
        sourceKey: "stateCode",
        foreignKey: "code",
      });
    }
  }

  Quote.init(
    {
      id: {
        type: DataTypes.NUMBER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      quoteId: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
      probability: DataTypes.STRING,
      projectName: DataTypes.STRING,
      units: DataTypes.INTEGER,
      value: DataTypes.DECIMAL,
      customerName: DataTypes.STRING,
      contact: DataTypes.STRING,
      endContractor: DataTypes.STRING,
      salesPerson: DataTypes.STRING,
      revision: DataTypes.STRING,
      projectAddress: DataTypes.STRING,
      quoteBy: DataTypes.STRING,
      creationDate: DataTypes.DATE,
      estAwardDate: DataTypes.DATE,
      revisionDate: DataTypes.DATE,
      nextFollowUp: DataTypes.DATE,
      sysAwardDate: DataTypes.DATE,

      attendees: DataTypes.STRING,
      location: DataTypes.STRING,
      reception: DataTypes.INTEGER,
      summaryOfMeeting: DataTypes.STRING,
      doingRight: DataTypes.STRING,
      areasToImprove: DataTypes.STRING,
      actionNextSteps: DataTypes.STRING,

      city: DataTypes.STRING,
      stateName: DataTypes.STRING,
      stateCode: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      streetAddress: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quote",
      timestamps: false,
    }
  );

  return Quote;
};
