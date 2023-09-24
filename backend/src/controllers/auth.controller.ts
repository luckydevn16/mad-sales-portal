import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import randomstring from "randomstring";
import add from "date-fns/add";
import { Op } from "sequelize";

import vars from "../config/vars";
import { sendVerificationCode } from "../services/email.service";
import constants from "../utils/constants";
import models from "../models";

const Invitation = models.Invitation;
const LoginLog = models.LoginLog;
const User = models.User;
const VerificationCode = models.VerificationCode;

export const checkAuth: RequestHandler = async (req, res, next) => {
  const { user }: { user: any } = req;

  return res.send({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    joinedAt: user.joinedAt,
    lastLogin: user.lastLogin,
    states: user.states,
  });
};

export const login: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  try {
    // check valid email
    if (
      !email.toLowerCase().includes("@madelevator.com") &&
      !email.toLowerCase().includes("@ecrcabs.com")
    ) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Sorry. Invalid email." });
    }

    // check email exist
    const user = await User.findOne({
      where: { email: { [Op.iLike]: email } },
    });
    if (user) {
      // check if user is active or not
      if (user.status === constants.status.inactive) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message:
            "Sorry. Your account is disabled. Please ask to administrator.",
        });
      }
    } else {
      const invitation = await Invitation.findOne({
        where: { email: { [Op.iLike]: email } },
      });
      if (!invitation) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message:
            "Sorry. You are not invited to this portal. Please ask to administrator.",
        });
      }
    }

    // create verification code
    const code = randomstring.generate({ length: 6, charset: "numeric" });

    // const result = await sendVerificationCode(email, code);
    // if (!result)
    //   return res
    //     .status(httpStatus.INTERNAL_SERVER_ERROR)
    //     .send({ message: "Something went wrong. Please try again later." });

    await VerificationCode.create({
      email,
      code,
      expiredAt: add(new Date(), { minutes: 1 }),
    });

    return res.status(httpStatus.OK).send();
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong. Please try again later." });
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  return res
    .clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    })
    .send();
};

export const verifyCode: RequestHandler = async (req, res, next) => {
  const { ip } = req;
  const { email, code }: { email: string; code: number } = req.body;
  let verificationCode;
  let role;

  try {
    verificationCode = await VerificationCode.findOne({
      where: { email: { [Op.iLike]: email }, code },
    });

    if (!verificationCode) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Verification code is invalid." });
    }

    verificationCode = await VerificationCode.findOne({
      where: {
        email: { [Op.iLike]: email },
        code,
        expiredAt: { [Op.gte]: new Date() },
      },
    });

    if (!verificationCode) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Verification code is expired." });
    }

    if (email.includes("@madelevator.com")) role = constants.role.mad;
    else if (email.includes("@ecrcabs.com")) role = constants.role.ecr;
    else role = constants.role.mad;

    let user = await User.findOne({
      where: { email: { [Op.iLike]: email } },
    });

    const invitation = await Invitation.findOne({
      where: { email: { [Op.iLike]: email } },
    });

    if (user) {
      await user.update({ lastLogin: new Date() });
    } else {
      [user] = await User.findOrCreate({
        where: { email: { [Op.iLike]: invitation.email } },
        defaults: {
          email: invitation.email,
          firstName: invitation.firstName,
          lastName: invitation.lastName,
          role: invitation.role,
          status: constants.status.active,
          joinedAt: new Date(),
          lastLogin: new Date(),
        },
      });
    }

    if (invitation && !invitation.acceptedAt) {
      await invitation.update({
        acceptedAt: new Date(),
      });
    }
    await LoginLog.create({
      ip,
      email,
    });

    return res
      .cookie(
        "token",
        jwt.sign({ id: user.dataValues.id }, vars.jwt.secret as string),
        {
          sameSite: "strict",
          httpOnly: true,
          signed: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        }
      )
      .send({
        email: user.dataValues.email,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        role: user.dataValues.role,
        status: user.dataValues.status,
      });
  } catch (error: any) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error?.message });
  }
};

export const resendCode: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const code = randomstring.generate({ length: 6, charset: "numeric" });

  try {
    const result = await sendVerificationCode(email, code);
    if (!result)
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Something went wrong. Please try again later." });

    await VerificationCode.create({
      email,
      code,
      expiredAt: add(new Date(), { minutes: 1 }),
    });

    return res.send();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

export const acceptInvitation: RequestHandler = async (req, res, next) => {
  const { ip } = req;
  const { token } = req.body;
  let invitation;
  let user;

  try {
    invitation = await Invitation.findOne({ where: { token } });

    if (!invitation) {
      return res.status(httpStatus.BAD_REQUEST).send();
    }

    invitation = await Invitation.findOne({
      where: { token, expiredAt: { [Op.gte]: new Date() } },
    });

    if (!invitation) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Invitation Link is expired." });
    }

    await invitation.update({
      acceptedAt: new Date(),
    });

    console.log(invitation);

    [user] = await User.findOrCreate({
      where: { email: { [Op.iLike]: invitation.email } },
      defaults: {
        email: invitation.email,
        firstName: invitation.firstName,
        lastName: invitation.lastName,
        role: invitation.role,
        status: constants.status.active,
        joinedAt: new Date(),
        lastLogin: new Date(),
      },
    });

    await LoginLog.create({
      ip,
      email: user.dataValues.email,
    });

    return res
      .cookie(
        "token",
        jwt.sign({ id: user.dataValues.id }, vars.jwt.secret as string),
        {
          sameSite: "strict",
          httpOnly: true,
          signed: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        }
      )
      .send({
        email: user.dataValues.email,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        role: user.dataValues.role,
        status: user.dataValues.status,
      });
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error?.message });
  }
};

export const saveProfile: RequestHandler = async (req, res, next) => {
  let { user }: { user: any } = req;
  const { firstName, lastName } = req.body;

  try {
    if (!user) return res.status(httpStatus.UNAUTHORIZED).send();

    user = await User.findOne({
      where: { email: { [Op.iLike]: user.email } },
    });

    await user.update({ firstName: firstName, lastName: lastName });

    return res.send({
      email: user.dataValues.email,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      role: user.dataValues.role,
      status: user.dataValues.status,
    });
  } catch (error: any) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      user,
      message: error?.message,
    });
  }
};
