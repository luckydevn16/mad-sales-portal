import { RequestHandler } from "express";
import httpStatus from "http-status";
import { Sequelize } from "sequelize";
import upload from "../utils/upload";
import { parseLoadOptions } from "../utils/sequelize";
import models from "../models";
import { getAllObjects, getObject } from "../services/aws.service";

const User = models.User;
const State = models.State;
const Quote = models.Quote;
const QuoteFile = models.QuoteFile;
const QuoteNote = models.QuoteNote;

//////////////////////////////////////////////////////////
/**
 * Quote
 */
export const getAllQuotes: RequestHandler = async (req, res, next) => {
  const user = req.user;

  let roleFilter = null;
  if (user.role !== "admin") {
    roleFilter = {
      email: user.email,
    };
  }
  const { loadOptions } = req.body;

  const params = parseLoadOptions(loadOptions);

  let quotes = await Quote.findAll({
    order: params.order,
    offset: params.offset,
    limit: params.limit,
    where: params.where.this,
    include: [
      {
        model: State,
        as: "state",
        attributes: ["code", "country", "name"],
        where: params.where?.state?.this,
        include: {
          model: User,
          as: "users",
          where:
            Object.keys(roleFilter ?? {}).length > 0 ||
            Object.keys(params.where?.state?.users ?? {}).length > 0
              ? {
                  ...roleFilter,
                  ...params.where?.state?.users,
                }
              : null,
          order: [["User.firstName", "ASC"]],
          attributes: ["id", "firstName", "lastName"],
        },
      },
    ],
    attributes: [
      "id",
      "quoteId",
      "type",
      "status",
      "probability",
      "projectName",
      "units",
      "value",
      "customerName",
      "contact",
      "endContractor",
      "salesPerson",
      "revision",
      "revisionDate",
      "projectAddress",
      "sysAwardDate",
      "quoteBy",
      "creationDate",
      "estAwardDate",
      "nextFollowUp",
    ],
  });

  const { count: totalCount } = await Quote.findAndCountAll({
    where: params.where.this,
  });

  return res.send({
    data: quotes,
    totalCount: totalCount,
  });
};

export const getQuote: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  let quote = await Quote.findOne({
    where: {
      id,
    },
    include: [
      {
        model: State,
        as: "state",
        attributes: ["code", "country", "name"],
        include: {
          model: User,
          as: "users",
          attributes: ["id", "firstName", "lastName"],
        },
      },
    ],
    attributes: [
      "id",
      "quoteId",
      "type",
      "status",
      "probability",
      "projectName",
      "units",
      "value",
      "customerName",
      "contact",
      "endContractor",
      "salesPerson",
      "revision",
      "revisionDate",
      "projectAddress",
      "sysAwardDate",
      "quoteBy",
      "creationDate",
      "estAwardDate",
      "nextFollowUp",
    ],
  });

  return res.send({ quote });
};

export const updateQuote: RequestHandler = async (req, res, next) => {
  const { id, status, probability, estAwardDate, nextFollowUp } = req.body;

  let quote = await Quote.findOne({
    where: {
      id,
    },
  });

  if (!quote) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The quote isn't existing now.",
    });
  }

  try {
    quote = await quote.update({
      status,
      probability,
      estAwardDate,
      nextFollowUp,
    });

    return res.send({
      message: "The quote has been updated successfully.",
      quote,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later",
    });
  }
};

//////////////////////////////////////////////////////////
/**
 * Quote Note
 */
export const getAllQuoteNotes: RequestHandler = async (req, res, next) => {
  const { quoteId } = req.body;

  let notes = await QuoteNote.findAll({
    where: { quoteId },
    order: [["createdAt", "DESC"]],
    attributes: ["id", "quoteId", "content", "createdAt", "updatedAt"],
    raw: true,
  });

  return res.send({
    notes,
  });
};

export const createQuoteNote: RequestHandler = async (req, res, next) => {
  const { quoteId, content } = req.body;

  if (!content) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Please input variable note.",
    });
  }

  // create
  try {
    await QuoteNote.create({
      quoteId,
      content,
    });

    let notes = await QuoteNote.findAll({
      where: { quoteId },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "quoteId", "content", "createdAt", "updatedAt"],
      raw: true,
    });

    return res.send({
      message: "Note has been successfully created.",
      notes,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};

//////////////////////////////////////////////////////////
/**
 * Quote File
 */
export const getAllQuoteFiles: RequestHandler = async (req, res, next) => {
  const { quoteId } = req.body;

  const files = await getAllObjects(quoteId);

  return res.send({
    files,
  });
};

export const uploadQuoteFiles: RequestHandler = async (req, res, next) => {
  upload.any()(req, res, async function (err: any) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Something went wrong while uploading files.",
      });
    } else {
      const { quoteId } = req.body;

      if (Number(req.files?.length) > 0) {
        Array(req.files).map(async (file: any) => {
          await QuoteFile.create({
            quoteId,
            orgName: file.originalname,
            fileName: file.filename,
            fileSize: file.size,
          });
        });
      }

      let files = await QuoteFile.findAll({
        where: { quoteId },
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "quoteId",
          "orgName",
          "fileName",
          "fileSize",
          "createdAt",
          "updatedAt",
        ],
        raw: true,
      });

      return res.send({
        message: "Files uploaded successfully!",
        files,
      });
    }
  });
};

export const downloadQuoteFile: RequestHandler = async (req, res, next) => {
  const { key } = req.body;

  const result: any = await getObject(key);

  if (result.status === "success") {
    res.status(httpStatus.OK).attachment(key).type(result.data.ContentType);
    return result.data.Body.pipe(res);
  } else {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error downloading file",
    });
  }
};

//////////////////////////////////////////////////////////
/**
 * Quote Visit
 */
export const initializeQuoteVisit: RequestHandler = async (req, res, next) => {
  const distinctSalesPerson = await Quote.findAll({
    attributes: ["salesPerson"],
    group: ["salesPerson"],
    where: { type: "Quote" },
  });

  const distinctCustomerNames = await Quote.findAll({
    attributes: ["customerName"],
    group: ["customerName"],
    where: { type: "Quote" },
  });

  let lastId = 1;

  const last = await Quote.findOne({
    where: {
      type: "Visit",
    },
    order: [["quoteId", "DESC"]],
    attributes: ["quoteId"],
  });

  if (last && last.quoteId) {
    lastId = Number(last.quoteId.substring(2)) + 1;
  }

  let quoteId = "V-" + String(lastId.toString().padStart(4, "0"));

  return res.send({
    distinctSalesPerson,
    distinctCustomerNames,
    quoteId,
  });
};

export const createQuoteVisit: RequestHandler = async (req, res, next) => {
  const {
    quoteId,
    salesPerson,
    creationDate,
    customerName,
    attendees,
    location,
    reception,
    summaryOfMeeting,
    doingRight,
    areasToImprove,
    actionNextSteps,
    city,
    stateName,
    stateCode,
    zipCode,
    streetAddress,
    country,
  } = req.body;

  // create
  try {
    await Quote.create({
      quoteId,
      type: "Visit",
      salesPerson,
      creationDate,
      customerName,
      attendees,
      location,
      reception,
      summaryOfMeeting,
      doingRight,
      areasToImprove,
      actionNextSteps,
      city,
      stateName,
      stateCode,
      zipCode,
      streetAddress,
      country,
    });

    return res.send({
      message: "Quote visit has been successfully created.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later",
    });
  }
};

export const getQuoteVisit: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  let visit = await Quote.findOne({
    where: {
      id,
    },
    attributes: [
      "id",
      "quoteId",
      "salesPerson",
      "creationDate",
      "customerName",
      "attendees",
      "location",
      "reception",
      "summaryOfMeeting",
      "doingRight",
      "areasToImprove",
      "actionNextSteps",
    ],
    raw: true,
  });

  return res.send({ visit });
};

export const updateQuoteVisit: RequestHandler = async (req, res, next) => {
  const {
    id,
    salesPerson,
    creationDate,
    customerName,
    attendees,
    location,
    reception,
    summaryOfMeeting,
    doingRight,
    areasToImprove,
    actionNextSteps,
    city,
    stateName,
    stateCode,
    zipCode,
    streetAddress,
    country,
  } = req.body;

  const visit = await Quote.findOne({
    where: { id },
  });

  if (!visit) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "The quote visit isn't existing now.",
    });
  }

  try {
    await visit.update({
      salesPerson,
      creationDate,
      customerName,
      attendees,
      location,
      reception,
      summaryOfMeeting,
      doingRight,
      areasToImprove,
      actionNextSteps,
      city,
      stateName,
      stateCode,
      zipCode,
      streetAddress,
      country,
    });

    return res.send({
      message: "Quote visit has been successfully updated.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong. Please try again later",
    });
  }
};
