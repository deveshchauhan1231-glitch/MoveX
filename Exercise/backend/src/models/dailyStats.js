import mongoose from "mongoose";
const dailyStatsSchema=new mongoose.Schema({
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
    },
    date: {
  type: Date,
  required: true
},
    calories:Number,
    strength:Number,    

});
dailyStatsSchema.index({ userId: 1, date: 1 });
export const dailyStats=mongoose.model("dailyStat",dailyStatsSchema);