import asyncHandler from "express-async-handler";
import { dailyStats } from "../models/dailyStats.js"
import { exercise } from "../models/exercise.js";
import { user } from "../models/Users.js";
import mongoose from "mongoose";

const getDailyStats = asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const stats = await dailyStats.findOne({
            userId: req.user.id,
            date: today
        });
        res.status(200).json({
            stats,
            message: "Database succesfully accessed"
        });
    } catch (err) {
        res.status(503).json({ message: "Database unavailable" });
    }
});
const getExercise = asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const allExercises = await exercise.find({
            userId: req.user.id,
            date: today
        });
        res.status(200).json({
            allExercises,
            message: "Database succesfully accessed"
        });
    } catch (err) {
        res.status(503).json({ message: "Database unavailable" });
    }
});
const postDailyStats = asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { calories, strength } = req.body;

    await Promise.all([
        dailyStats.updateOne(
            {
                userId: req.user.id,
                date: today
            },
            {
                $inc: { calories, strength },
                $setOnInsert: {
                    userId: (req.user.id),
                    date: today
                }
            },
            { upsert: true }
        ),
        user.updateOne(
            { _id: req.user.id },
            { $inc: { totalCal: calories, totalStrength: strength } }
        )
    ]);

    res.status(200).json({ message: "Successfully updated the db" });
});
const postDailyExercises = asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { exercises } = req.body;
    const userObjectId = (req.user.id);

    const addExercise = await exercise.updateOne(
        {
            userId: userObjectId,
            date: today
        },
        {
            $push: { exercises: exercises },
            $setOnInsert: {
                userId: userObjectId,
                date: today
            }
        },
        { upsert: true }
    );

    if (addExercise.acknowledged) {
        res.status(200).json({ message: "Successfully updated the db" });
    } else {
        res.status(503).json({ message: "Database unavailable" });
    }
});
const getTotalCalandStr = asyncHandler(async (req, res) => {
    try {
        const foundUser = await user.findById(req.user.id).select("totalCal totalStrength");
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            res.json({
                totalCal: foundUser.totalCal,
                totalStrength: foundUser.totalStrength
            });
        }
    } catch (ee) {
        res.status(503).json({ message: "Database unavailable" });
    }
});
//heatmap function needs to be debugged 
const getHeatMapInfo = asyncHandler(async (req, res) => {
    try {
        const userObjectId = (req.user.id);

        const end = new Date();
        end.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() + 1);
        const start = new Date(end);
        start.setDate(start.getDate() - 365);

        const stats = await dailyStats.find({
            userId: userObjectId,
            date: {
                $gte: start,
                $lt: end
            }
        }).sort({ date: 1 });

        res.status(200).json(stats);
    } catch (e) {
        res.status(503).json({ message: "Database unavailable" });
    }
});
const getBest = asyncHandler(async (req, res) => {
    try {
        const stats = await dailyStats.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
            {
                $group: {
                    _id: "$userId",
                    maxCalories: { $max: "$calories" },
                    maxStrength: { $max: "$strength" }
                }
            }
        ]);

        const result = stats[0];
        res.status(200).json(result);
    } catch (ee) {
        res.status(503).json({ message: `Database unavailable ${ee}` });
    }
});


export default { getDailyStats, getBest, getExercise, postDailyStats, getTotalCalandStr, postDailyExercises, getHeatMapInfo };
