"use strict";
import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export default (sequelize: Sequelize) => {
  class UserState extends Model<
    InferAttributes<UserState>,
    InferCreationAttributes<UserState>
  > {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<number>;
    declare stateId: ForeignKey<number>;
    declare code: string;

    static associate(models: DB) {
      models.User.belongsToMany(models.State, {
        as: "states",
        foreignKey: "userId",
        through: UserState,
      });
      models.State.belongsToMany(models.User, {
        as: "users",
        foreignKey: "stateId",
        through: UserState,
      });
    }
  }
  UserState.init(
    {
      id: {
        type: DataTypes.NUMBER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      stateId: {
        type: DataTypes.INTEGER,
        references: {
          model: "States",
          key: "id",
        },
      },
      code: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UserState",
      timestamps: false,
    }
  );

  return UserState;
};
