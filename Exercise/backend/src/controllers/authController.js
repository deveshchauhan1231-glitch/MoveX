import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { user } from "../models/Users.js";
import { createEmailVerificationToken, sendVerificationEmail } from "../services/emailService.js";

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all the fields');
    }

    const userExists = await user.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("user already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = createEmailVerificationToken();

    const currUser = await user.create({
        name,
        email,
        password: hashedPassword,
        emailVerificationToken: verificationToken.hashedToken,
        emailVerificationExpires: verificationToken.expiresAt
    });
    if(currUser){
        await sendVerificationEmail({
            email: currUser.email,
            name: currUser.name,
            token: verificationToken.rawToken
        });

        res.status(201).json({
        success: true,
        message: "Account created successfully"
    });
    }
    
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all the fields');
    }
    const currUser = await user.findOne({ email });
    if (!currUser) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, currUser.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    if (currUser.isVerified === false) {
        res.status(403);
        throw new Error("Please verify your email before logging in");
    }
    //signing tokens , here we give id from currUser.id
    const accessToken = jwt.sign({ id: currUser._id }, process.env.JWT_SECRET, { expiresIn: '15m', });
    const refreshToken = jwt.sign({ id: currUser._id }, process.env.JWT_SECRET, { expiresIn: '7d', });

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 15 * 60 * 1000
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        user: {
            id: currUser.id,
            email: currUser.email
        }
    });
})

const logout=asyncHandler(async(req,res)=>{
    
    
    res.clearCookie("refresh_token",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        path:'/'
    });
    res.clearCookie("access_token",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        path:'/'
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.redirect(`${process.env.FRONTEND_URL}/Login?verified=missing`);
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const currUser = await user.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { $gt: new Date() }
    });

    if (!currUser) {
        return res.redirect(`${process.env.FRONTEND_URL}/Login?verified=invalid`);
    }

    currUser.isVerified = true;
    currUser.emailVerificationToken = undefined;
    currUser.emailVerificationExpires = undefined;
    await currUser.save();

    const profileToken = jwt.sign(
        { id: currUser._id, purpose: "complete-profile" },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
    );

    return res.redirect(`${process.env.FRONTEND_URL}/userInfo?token=${profileToken}&verified=success`);
});

const completeProfileAfterVerification = asyncHandler(async (req, res) => {
    const { token, name, gender, weight, age } = req.body;

    if (!token) {
        res.status(400);
        throw new Error("Verification session is missing");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        res.status(401);
        throw new Error("Verification session is invalid or expired");
    }

    if (decodedToken.purpose !== "complete-profile") {
        res.status(401);
        throw new Error("Verification session is invalid");
    }

    await user.updateOne(
        { _id: decodedToken.id, isVerified: true },
        {
            $set: {
                name,
                gender,
                weight,
                age
            }
        }
    );

    res.status(200).json({
        success: true,
        message: "Profile completed successfully"
    });
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const currUser = await user.findOne({ email });

    if (!currUser) {
        res.status(404);
        throw new Error("User not found");
    }

    if (currUser.isVerified) {
        res.status(400);
        throw new Error("Email is already verified");
    }

    const verificationToken = createEmailVerificationToken();
    currUser.emailVerificationToken = verificationToken.hashedToken;
    currUser.emailVerificationExpires = verificationToken.expiresAt;
    await currUser.save();

    await sendVerificationEmail({
        email: currUser.email,
        name: currUser.name,
        token: verificationToken.rawToken
    });

    res.status(200).json({
        success: true,
        message: "Verification email sent successfully"
    });
});

export default {signup,login,logout,verifyEmail,resendVerificationEmail,completeProfileAfterVerification};
