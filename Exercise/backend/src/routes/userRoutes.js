import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";
const router=express();
router.get("/info",authMiddleware,userController.getInfo);
router.post("/update",authMiddleware,userController.updateInfo);
export default router;