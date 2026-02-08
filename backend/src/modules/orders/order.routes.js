import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  validateCart,
} from "./order.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// User
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// Admin
router.get("/", protect, authorizeRoles("ADMIN"), getAllOrders);
router.put("/:id/status", protect, authorizeRoles("ADMIN"), updateOrderStatus);
router.post("/validate-cart", protect, validateCart);
export default router;
