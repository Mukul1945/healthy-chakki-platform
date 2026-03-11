import express from "express";
import { recommendFlourMix, chatWithAI } from "./ai.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/recommend-flour", protect, recommendFlourMix);
router.post("/chat", chatWithAI); // Open for all users, no protect needed for support bot

export default router;
