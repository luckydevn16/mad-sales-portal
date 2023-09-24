import { RequestHandler } from "express";
import randomstring from "randomstring";
import add from "date-fns/add";
import httpStatus from "http-status";

import { sendInvitation } from "../services/email.service";
import constants from "../utils/constants";
import { parseLoadOptions } from "../utils/sequelize";
import vars from "../config/vars";
import models from "../models";

const User = models.User;
const Invitation = models.Invitation;

export const sendInvite: RequestHandler = async (req, res, next) => {
  const { email, firstName, lastName, role } = req.body;
  const { user }: { user: any } = req;

  // create new token
  const token = randomstring.generate({ length: 20 });

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

    // send email invitation
    const result = await sendInvitation(email, token);
    if (!result)
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Something went wrong. Please try again later." });

    // create new invitation
    await Invitation.create({
      email,
      firstName,
      lastName,
      role,
      token,
      inviter: user.email,
      sentAt: new Date(),
      expiredAt: add(new Date(), { days: Number(vars.invitation.expiresIn) }),
    });

    return res.send({ message: "Invitation is sent successfully." });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong. Please try again later." });
  }
};

export const getInvitations: RequestHandler = async (req, res, next) => {
  const { loadOptions } = req.body;

  const params = parseLoadOptions(loadOptions);

  let invitations = await Invitation.findAll({
    where: params.where.this,
    order: params.order,
    offset: params.offset,
    limit: params.limit,
    attributes: [
      "id",
      "email",
      "firstName",
      "lastName",
      "token",
      "sentAt",
      "expiredAt",
      "acceptedAt",
    ],
  });

  const { count: totalCount } = await Invitation.findAndCountAll({
    where: params.where.this,
  });

  return res.send({
    data: invitations,
    totalCount: totalCount,
  });
};

export const deleteInvitation: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  // check existing
  const existing = await Invitation.findOne({
    where: { id },
  });

  if (!existing) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The invitation isn't existing now.",
    });
  }

  try {
    // delete
    await User.destroy({
      where: { email: existing.email, status: constants.status.pending },
    });
    await Invitation.destroy({ where: { id } });

    return res.send({
      message: "Invitation has been successfully deleted.",
    });
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: error?.message,
    });
  }
};
