const multer = require("multer");

import express from "express";

import * as controller from "../controllers/quote.controller";
import * as middleware from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/get").post(middleware.authRequired, controller.getQuote);
router.route("/update").post(middleware.authRequired, controller.updateQuote);
router.route("/all").post(middleware.authRequired, controller.getAllQuotes);

router
  .route("/note/all")
  .post(middleware.authRequired, controller.getAllQuoteNotes);
router
  .route("/note/create")
  .post(middleware.authRequired, controller.createQuoteNote);

router
  .route("/file/all")
  .post(middleware.authRequired, controller.getAllQuoteFiles);

router
  .route("/file/upload")
  .post(middleware.authRequired, controller.uploadQuoteFiles);
router
  .route("/file/download")
  .post(middleware.authRequired, controller.downloadQuoteFile);

router
  .route("/visit/initialize")
  .post(middleware.authRequired, controller.initializeQuoteVisit);
router
  .route("/visit/create")
  .post(middleware.authRequired, controller.createQuoteVisit);
router
  .route("/visit/get")
  .post(middleware.authRequired, controller.getQuoteVisit);
router
  .route("/visit/update")
  .post(middleware.authRequired, controller.updateQuoteVisit);

export default router;
