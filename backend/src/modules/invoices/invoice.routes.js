import express from "express";
import { createInvoice } from "./invoice.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { downloadInvoice } from "./invoice.controller.js";

const router = express.Router();

// Admin generates invoice
router.post(
  "/:orderId",
  protect,
  authorizeRoles("ADMIN"),
  createInvoice
);
router.get(
    "/download/:invoiceNumber",
    protect,
    authorizeRoles("ADMIN"),
    downloadInvoice
  );
export default router;
