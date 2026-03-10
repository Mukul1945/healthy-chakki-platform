import express from "express";
import { createInvoice, downloadInvoice, getInvoiceByOrder } from "./invoice.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Any authenticated user: download their invoice PDF (streamed on-the-fly)
router.get("/download/:orderId", protect, downloadInvoice);

// Any authenticated user: check if an invoice record exists for their order
router.get("/order/:orderId", protect, getInvoiceByOrder);

// Admin: manually create invoice record
router.post("/:orderId", protect, authorizeRoles("ADMIN"), createInvoice);

export default router;
