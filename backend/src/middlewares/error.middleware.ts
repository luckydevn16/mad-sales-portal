import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import vars from "../config/vars";

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler: ErrorRequestHandler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (vars.env !== "development") {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

export default handler;
