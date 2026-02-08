import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { adminDashboard, addProduct } from "./admin.controller.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

// All admin routes are protected + admin-only
router.get(
  "/dashboard",
  protect,
  authorizeRoles("ADMIN"),
  adminDashboard
);

router.post(
  "/products",
  protect,
  authorizeRoles("ADMIN"),
  upload.single("image"),
  addProduct
);

export default router;
