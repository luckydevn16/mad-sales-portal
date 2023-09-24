import { RequestHandler } from "express";
import httpStatus from "http-status";

import { parseLoadOptions } from "../utils/sequelize";
import models from "../models";

const User = models.User;
const State = models.State;
const UserState = models.UserState;

export const getStates: RequestHandler = async (req, res, next) => {
  const { loadOptions } = req.body;

  const params = parseLoadOptions(loadOptions);

  let states = await State.findAll({
    where: params.where.this,
    order: params.order,
    offset: params.offset,
    limit: params.limit,
    attributes: ["id", "code", "name", "country", "createdAt", "updatedAt"],
    include: {
      model: User,
      as: "users",
      through: {
        attributes: [],
      },
    },
  });

  const { count: totalCount } = await State.findAndCountAll({
    where: params.where.this,
  });

  return res.send({
    data: states,
    totalCount: totalCount,
  });
};

export const getAllStates: RequestHandler = async (req, res, next) => {
  let states = await State.findAll({
    where: {},
    order: [
      ["country", "DESC"],
      ["name", "ASC"],
    ],
    attributes: ["id", "name", "code", "country"],
    raw: true,
  });

  return res.send({
    states: states ?? [],
  });
};

export const createState: RequestHandler = async (req, res, next) => {
  const { code, name, country } = req.body;

  // check duplication
  const existing = await State.findOne({
    where: { code, name },
  });

  if (existing) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "A state with same code and name is already existing now.",
    });
  }

  // create
  try {
    await State.create({
      code,
      name,
      country,
    });

    return res.send({
      message: "State has been successfully created.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later",
    });
  }
};

export const updateState: RequestHandler = async (req, res, next) => {
  const { id, code, name, country, users } = req.body;

  let state = await State.findOne({
    where: { id },
  });

  if (!state) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The state isn't existing now.",
    });
  }

  try {
    state = await state.update({ code, name, country });

    // delete old foreign data
    await UserState.destroy({
      where: { stateId: state.id },
    });
    await users.forEach(async (element: any) => {
      await state.addUser(element.id, { through: { code: state.code } });
    });

    return res.send({
      message: "State has been successfully updated.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later",
    });
  }
};

export const deleteState: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  // check existing
  const existing = await State.findOne({
    where: { id },
  });

  if (!existing) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The state isn't existing now.",
    });
  }

  // delete
  try {
    await UserState.destroy({
      where: { stateId: id },
    });

    await State.destroy({ where: { id } });

    return res.send({
      message: "State has been successfully deleted.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};
