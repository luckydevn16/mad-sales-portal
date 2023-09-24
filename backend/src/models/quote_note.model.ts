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
  class QuoteNote extends Model<
    InferAttributes<QuoteNote>,
    InferCreationAttributes<QuoteNote>
  > {
    declare id: CreationOptional<number>;
    declare quoteId: number | null;
    declare content: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static associate(models: DB) {}
  }

  QuoteNote.init(
    {
      id: {
        type: DataTypes.NUMBER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      quoteId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "QuoteNote",
    }
  );

  return QuoteNote;
};
