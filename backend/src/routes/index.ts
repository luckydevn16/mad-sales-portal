import express from "express";

import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import invitationRoutes from "./invitation.route";
import stateRoutes from "./state.route";
import quoteRoutes from "./quote.route";
import healthRoute from "./health.route";

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/invitation", invitationRoutes);
router.use("/api/state", stateRoutes);
router.use("/api/quote", quoteRoutes);
router.use("/api/health", healthRoute);

export default router;
