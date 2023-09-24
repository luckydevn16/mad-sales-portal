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
  class LoginLog extends Model<
    InferAttributes<LoginLog>,
    InferCreationAttributes<LoginLog>
  > {
    declare id: CreationOptional<number>;
    declare ip: string;
    declare email: string;
    declare createdAt: CreationOptional<Date>;

    static associate(models: DB) {
      // define association here
    }
  }

  LoginLog.init(
    {
      id: {
        type: DataTypes.NUMBER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: new DataTypes.STRING(125),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(125),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LoginLog",
      updatedAt: false,
    }
  );

  return LoginLog;
};
