import { RequestHandler } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import vars from "../config/vars";
import models from "../models";
import constants from "../utils/constants";

const User = models.User;
const State = models.State;

export const authRequired: RequestHandler = async (req, res, next) => {
  const { token } = req.signedCookies;

  try {
    const { id }: any = jwt.verify(token, vars.jwt.secret as string);
    const user = await User.findByPk(id, {
      include: {
        model: State,
        as: "states",
      },
    });

    if (!user) {
      throw new Error("");
    }

    req.user = user;
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }

  next();
};

export const adminRequired: RequestHandler = async (req, res, next) => {
  const { token } = req.signedCookies;

  try {
    const { id }: any = jwt.verify(token, vars.jwt.secret as string);
    const user = await User.findByPk(id, {
      include: {
        model: State,
        as: "states",
      },
    });

    if (user.role !== constants.role.admin) {
      throw new Error("You have no permission.");
    }
  } catch (error) {
    return res.status(httpStatus.FORBIDDEN).send({
      message: "You have no permission.",
    });
  }

  next();
};
