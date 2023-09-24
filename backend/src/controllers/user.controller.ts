import { RequestHandler } from "express";
import httpStatus from "http-status";

import constants from "../utils/constants";
import { parseLoadOptions } from "../utils/sequelize";
import models from "../models";

const User = models.User;
const State = models.State;
const UserState = models.UserState;

export const getUsers: RequestHandler = async (req, res, next) => {
  const { loadOptions } = req.body;

  const params = parseLoadOptions(loadOptions);

  let users = await User.findAll({
    where: params.where.this,
    order: params.order,
    offset: params.offset,
    limit: params.limit,
    attributes: [
      "id",
      "email",
      "firstName",
      "lastName",
      "role",
      "status",
      "joinedAt",
      "lastLogin",
    ],
    include: {
      model: State,
      as: "states",
    },
  });

  const { count: totalCount } = await User.findAndCountAll({
    where: params.where.this,
  });

  return res.send({
    data: users,
    totalCount: totalCount,
  });
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  let user = await User.findOne({
    where: { id },
    attributes: [
      "id",
      "email",
      "firstName",
      "lastName",
      "role",
      "status",
      "joinedAt",
      "lastLogin",
    ],
    include: {
      model: State,
      as: "states",
    },
  });

  return res.send({
    user,
  });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id, email, firstName, lastName, role, status, states } = req.body;

  // check existing
  let user: any = await User.findOne({
    where: { id },
    include: {
      model: State,
      as: "states",
    },
  });

  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The user isn't existing now.",
    });
  }

  // update
  try {
    user = await user.update(
      { email, firstName, lastName, role, status, states },
      {
        include: {
          model: State,
        },
      }
    );

    // delete old foreign data
    await UserState.destroy({
      where: { userId: user.id },
    });
    await states.forEach(async (element: any) => {
      await user.addState(element.id, { through: { code: element.code } });
    });
    return res.send({
      message: "User has been updated successfully.",
      user,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later",
    });
  }
};

export const updateUserStatus: RequestHandler = async (req, res, next) => {
  const { id, status } = req.body;

  // check existing
  const existing = await User.findOne({
    where: { id },
  });

  if (!existing) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The user isn't existing now.",
    });
  }

  // update
  try {
    await existing.update({ status });

    return res.send({
      message:
        status === constants.status.active
          ? "User has been successfully enabled."
          : "User has been successfully disabled.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  // check existing
  const existing = await User.findOne({
    where: { id },
  });

  if (!existing) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The user isn't existing now.",
    });
  }

  // check self deleting
  if (existing?.email === req.user.email) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Sorry. You cannot delete yourself.",
    });
  }

  // delete
  try {
    await UserState.destroy({
      where: { userId: id },
    });
    await User.destroy({ where: { id } });

    return res.send({
      message: "User has been successfully deleted.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getSalesPersons: RequestHandler = async (req, res, next) => {
  let users = await User.findAll({
    where: {},
    order: [["id", "ASC"]],
    attributes: ["id", "firstName", "lastName", "email"],
    raw: true,
  });

  return res.send({
    users: users ?? [],
  });
};
