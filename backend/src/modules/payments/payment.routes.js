import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "./payment.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyRazorpayPayment);

export default router;
