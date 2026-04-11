import express from "express";
import cookieParser from "cookie-parser"

import progressRoutes from "./routes/progressRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import exerciseDbRoutes from "./routes/exerciseDbRoutes.js"
import SahayService from "./services/SahayService.js"
import userRoutes from "./routes/userRoutes.js"
import CalorieCounter from "./services/CalorieCounter.js"
import cors from "cors";

const app=express();
app.use(cors({
  origin: process.env.FRONTEND_URL,  
  credentials: true  
}));
console.log(process.env.FRONTEND_URL)

app.use(cookieParser());
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/progress',progressRoutes);
app.use('/info',exerciseDbRoutes);
app.use('/chatbot',SahayService);
app.use('/image',CalorieCounter);
app.use('/users',userRoutes);

export default app;
