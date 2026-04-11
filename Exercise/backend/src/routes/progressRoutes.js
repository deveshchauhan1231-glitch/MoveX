import express from "express"
import progressController from "../controllers/progressController.js"
import authMiddleware from "../middleware/authMiddleware.js";
const router=express();
router.get("/getDailyStats",authMiddleware,progressController.getDailyStats);
router.get("/getExercise",authMiddleware,progressController.getExercise);
router.post("/postDailyStats",authMiddleware,progressController.postDailyStats);
router.post("/postDailyExercises",authMiddleware,progressController.postDailyExercises);
router.get("/getHeatMapInfo",authMiddleware,progressController.getHeatMapInfo);
router.get("/getTotalCalandStr",authMiddleware,progressController.getTotalCalandStr);
router.get("/getBest",authMiddleware,progressController.getBest);
export default router;
