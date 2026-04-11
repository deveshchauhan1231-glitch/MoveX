import asyncHandler from "express-async-handler";
import { user } from "../models/Users.js"
import requireAppUser from "../utils/requireAppUser.js";

const updateInfo = asyncHandler(async(req,res)=> {
    const { name,gender, weight, age } = req.body;
    const currentUser = requireAppUser(req, res);
    const uid = currentUser._id;
    try {
        await user.updateOne(
            { _id: uid },
            {
            $set: { name, gender, weight, age }
        }
        );
        res.status(200).json({ message: "Successfully updated the db" });
    } catch (err) {
        res.status(503).json({ message: "Database unavailable" });
    }
})
const getInfo = asyncHandler(async(req,res)=> {
    const currentUser = requireAppUser(req, res);
    const uid=currentUser._id;
    try{
        const info = await user.findById(uid).select("gender age weight name");
        res.status(200).json({
            info,
            message: "Database succesfully accessed"
        });

    }catch(err){
        res.status(503).json({ message: "Database unavailable" });
    }
})
export default {updateInfo,getInfo};
