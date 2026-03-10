import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
} from "./notification.controller.js";

const router = express.Router();

router.use(protect); // All notification routes semi-protected

router.get("/", getMyNotifications);
router.put("/read-all", markAllAsRead);
router.put("/:id/read", markAsRead);

export default router;
