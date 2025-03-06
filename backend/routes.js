import express from "express";
import { processMessage } from "./ai.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { message, userId } = req.body;
    const reply = await processMessage(userId, message);
    res.json({ reply });
});

export default router;
