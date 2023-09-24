import express from "express";

import * as controller from "../controllers/state.controller";
import * as middleware from "../middlewares/auth.middleware";

const router = express.Router();

router
  .route("/get")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.getStates
  );
router
  .route("/all")
  .get(
    middleware.authRequired,
    middleware.adminRequired,
    controller.getAllStates
  );
router
  .route("/create")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.createState
  );
router
  .route("/update")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.updateState
  );
router
  .route("/delete")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.deleteState
  );

export default router;
