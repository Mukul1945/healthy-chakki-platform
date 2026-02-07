import express from "express";

const router = express.Router();

// Placeholder auth routes – add login, register, etc. as needed
router.get("/", (req, res) => {
  res.json({ message: "Auth routes" });
});

export default router;
