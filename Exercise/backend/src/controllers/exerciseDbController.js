import asyncHandler from "express-async-handler";
import { exerciseDB } from "../models/exerciseDB.js";
const getThatExercise=asyncHandler(async(req,res)=>{
    const exName=req.params.name;
    try{
        const info=await exerciseDB.findOne({
            name:exName
        })
        if (!info) {
      return res.status(404).json({ message: "Exercise not found" });
    }

        res.status(200).json(Array.isArray(info) ? info : [info]);
    }catch(ee)
    {
        res.status(503).json({message : "Database unavailable"})
    }
});
const getAllExercises=asyncHandler(async(req,res)=>{
    try{
        const info=await exerciseDB.find();
        if (!info) {
      return res.status(404).json({ message: "Exercise not found" });
    }

        res.status(200).json(Array.isArray(info) ? info : [info]);
    }catch(ee)
    {
        res.status(503).json({message:"Database unavailable"})
    }
});
const getExerciseByFilter=asyncHandler(async(req,res)=>{
    const filter=req.params.filter;
    try{
        const info=await exerciseDB.find({
            bodyParts:filter
        });
        if (!info) {
      return res.status(404).json({ message: "Exercise not found" });
    }

        res.status(200).json(Array.isArray(info) ? info : [info]);
    }catch(ee)
    {
        res.status(503).json({message:"Database unavailable"})
    }
});
export default{getAllExercises,getThatExercise,getExerciseByFilter};