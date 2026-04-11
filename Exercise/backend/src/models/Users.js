import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./]).{8,}$/,
            "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
        ]
    },
    gender:String,
    weight:Number,
    age:Number,
    goal:String,
    totalCal:Number,
    totalStrength:Number,
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date
    
},{timestamps :true});
export const user=mongoose.model("user",userSchema);
//collection name users
