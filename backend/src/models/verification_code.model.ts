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
  class VerificationCode extends Model<
    InferAttributes<VerificationCode>,
    InferCreationAttributes<VerificationCode>
  > {
    declare id: CreationOptional<number>;
    declare email: string;
    declare code: string;
    declare expiredAt: Date;
    declare createdAt: CreationOptional<number>;

    static associate(models: DB) {}
  }

  VerificationCode.init(
    {
      id: {
        type: DataTypes.NUMBER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: new DataTypes.STRING(125),
        allowNull: false,
      },
      code: {
        type: new DataTypes.STRING(25),
        allowNull: false,
      },
      expiredAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "VerificationCode",
      updatedAt: false,
    }
  );

  return VerificationCode;
};
