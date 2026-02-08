import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { adminDashboard } from "./admin.controller.js";

const router = express.Router();

// All admin routes are protected + admin-only
router.get(
  "/dashboard",
  protect,
  authorizeRoles("ADMIN"),
  adminDashboard
);

export default router;
