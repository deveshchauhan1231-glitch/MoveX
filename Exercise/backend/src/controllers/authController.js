import asyncHandler from 'express-async-handler';
import { user } from "../models/Users.js";

const completeProfileAfterVerification = asyncHandler(async (req, res) => {
    const { name, gender, weight, age } = req.body;

    const existingUser = await user.findOne({
        $or: [
            { supabaseUserId: req.user.id },
            { email: req.user.email }
        ]
    });

    if (existingUser) {
        existingUser.supabaseUserId = req.user.id;
        existingUser.email = req.user.email;
        existingUser.name = name;
        existingUser.gender = gender;
        existingUser.weight = weight;
        existingUser.age = age;
        existingUser.isVerified = true;
        await existingUser.save();
    } else {
        await user.create({
            supabaseUserId: req.user.id,
            email: req.user.email,
            name,
            gender,
            weight,
            age,
            isVerified: true
        });
    }

    res.status(200).json({
        success: true,
        message: "Profile completed successfully"
    });
});

export default {completeProfileAfterVerification};
