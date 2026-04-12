import express from "express"
import exerciseDbController from "../controllers/exerciseDbController.js";
const router = express.Router()
router.get("/getAllExercises",exerciseDbController.getAllExercises);
router.get("/getThatExercise/:name",exerciseDbController.getThatExercise);
router.get("/getExerciseByFilter/:filter",exerciseDbController.getExerciseByFilter);
export default router;
