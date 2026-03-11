import express from "express";
import { recommendFlourMix } from "./ai.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/recommend-flour", protect, recommendFlourMix);

export default router;
