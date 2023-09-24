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
  class Invitation extends Model<
    InferAttributes<Invitation>,
    InferCreationAttributes<Invitation>
  > {
    declare id: CreationOptional<number>;
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare role: string;
    declare token: string;
    declare inviter: string;
    declare sentAt: Date;
    declare expiredAt: Date | null;
    declare acceptedAt: Date | null;
    declare createdAt: CreationOptional<Date>;

    static associate(models: DB) {}
  }

  Invitation.init(
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
      token: {
        type: new DataTypes.STRING(125),
        allowNull: false,
      },
      inviter: {
        type: new DataTypes.STRING(125),
        allowNull: false,
      },
      sentAt: DataTypes.DATE,
      expiredAt: DataTypes.DATE,
      acceptedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Invitation",
      updatedAt: false,
    }
  );

  return Invitation;
};
