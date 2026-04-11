import express from "express";
import authControllers from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); // ✅ fix here

router.post('/complete-profile', authMiddleware, authControllers.completeProfileAfterVerification);

export default router;
