"use strict";
import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Optional,
  CreationOptional,
} from "sequelize";

export default (sequelize: Sequelize) => {
  class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare id: CreationOptional<number>;
    declare email: string;
    declare firstName: string | null;
    declare lastName: string | null;
    declare role: string;
    declare status: string;
    declare joinedAt: Date | null;
    declare lastLogin: Date | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static associate(models: DB) {}
  }
  User.init(
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
      firstName: {
        type: new DataTypes.STRING(125),
        allowNull: true,
      },
      lastName: {
        type: new DataTypes.STRING(125),
        allowNull: true,
      },
      role: {
        type: new DataTypes.STRING(25),
        allowNull: false,
      },
      status: {
        type: new DataTypes.STRING(25),
        allowNull: false,
      },
      joinedAt: DataTypes.DATE,
      lastLogin: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
