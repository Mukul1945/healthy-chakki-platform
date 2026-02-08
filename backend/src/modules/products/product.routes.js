import express from "express";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "./product.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);

// Admin only
router.post("/", protect, authorizeRoles("ADMIN"), createProduct);
router.put("/:id", protect, authorizeRoles("ADMIN"), updateProduct);

export default router;
