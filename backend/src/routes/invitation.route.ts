import express from "express";

import * as controller from "../controllers/invitation.controller";
import * as middleware from "../middlewares/auth.middleware";

const router = express.Router();

router
  .route("/send")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.sendInvite
  );
router
  .route("/get")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.getInvitations
  );
router
  .route("/delete")
  .post(
    middleware.authRequired,
    middleware.adminRequired,
    controller.deleteInvitation
  );

export default router;
