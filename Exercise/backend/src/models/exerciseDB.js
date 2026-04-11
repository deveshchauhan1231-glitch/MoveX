import mongoose from "mongoose";
const exerciseDbSchema=new mongoose.Schema({
    name:String,
    steps:[{
        type:String,
        required:true
    }],
    bodyParts:[{
        type:String,
        required:true
    }],
    met:Number,
    type: {
                type: String,  
                enum: ["reps", "time", "distance"],  
                required: true
            },
    usesWeight:Boolean
})
exerciseDbSchema.index({ name: 1 });
exerciseDbSchema.index({ bodyParts: 1 });
export const exerciseDB=new mongoose.model("exerciseDB",exerciseDbSchema,"exerciseDB");