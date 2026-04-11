import mongoose from "mongoose";
const exerciseSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        
    },
    date:Date,
    exercises: [
        {
            exerciseName: {
                type: String,  
                required: true
            },
            type: {
                type: String,  
                enum: ["reps", "time", "distance"],  
                required: true
            },
            duration: Number,
            reps: Number,
            weight: Number,
            distance: Number,
            sets:Number
        }
    ]
});

exerciseSchema.index({ userId: 1, date: 1 });

export const exercise=mongoose.model("exercise",exerciseSchema);