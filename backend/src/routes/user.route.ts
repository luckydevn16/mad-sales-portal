import express from "express";

import * as controller from "../controllers/user.controller";
import * as middleware from "../middlewares/auth.middleware";

const router = express.Router();

router
  .route("/get")
  .post(middleware.authRequired, middleware.adminRequired, controller.getUsers);
router
  .route("/detail")
  .post(middleware.authRequired, middleware.adminRequired, controller.getUser);
router
  .route("/update-status")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.updateUserStatus
  );
router
  .route("/update")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.updateUser
  );
router.route("/delete").post(middleware.authRequired, controller.deleteUser);
router
  .route("/sales-persons")
  .get(
    middleware.authRequired,
    middleware.adminRequired,
    controller.getSalesPersons
  );

export default router;
