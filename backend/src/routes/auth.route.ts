import express from "express";

import * as controller from "../controllers/auth.controller";
import * as middleware from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/check").get(middleware.authRequired, controller.checkAuth);

router.route("/login").post(controller.login);
router.route("/logout").get(controller.logout);

router.route("/verify-code").post(controller.verifyCode);
router.route("/resend-code").post(controller.resendCode);
router.route("/accept-invitation").post(controller.acceptInvitation);

router.route("/profile").post(middleware.authRequired, controller.saveProfile);

export default router;
