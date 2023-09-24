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
  class QuoteFile extends Model<
    InferAttributes<QuoteFile>,
    InferCreationAttributes<QuoteFile>
  > {
    declare id: CreationOptional<number>;
    declare quoteId: number | null;
    declare orgName: string | null;
    declare fileName: string | null;
    declare fileSize: number | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static associate(models: DB) {}
  }

  QuoteFile.init(
    {
      id: {
        type: DataTypes.NUMBER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      quoteId: DataTypes.INTEGER,
      orgName: DataTypes.STRING,
      fileName: DataTypes.STRING,
      fileSize: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "QuoteFile",
    }
  );

  return QuoteFile;
};
