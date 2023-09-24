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
  class State extends Model<
    InferAttributes<State>,
    InferCreationAttributes<State>
  > {
    declare id: CreationOptional<number>;
    declare code: string;
    declare name: string;
    declare country: string;

    static associate(models: DB) {
      models.State.belongsToMany(models.Quote, {
        as: "quotes",
        targetKey: "stateCode",
        through: "code",
      });
    }
  }

  State.init(
    {
      id: {
        type: DataTypes.NUMBER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: new DataTypes.STRING(125),
        allowNull: false,
        unique: true,
      },
      name: {
        type: new DataTypes.STRING(125),
        allowNull: false,
      },
      country: {
        type: new DataTypes.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "State",
    }
  );

  return State;
};
