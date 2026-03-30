import mongoose from "mongoose";

const habitsSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    repeat:{
        type:String,
        enum:["Daily", "Weekly"],
        default:"Daily"
    },
    repeatDays:{
        type:
    }
}) 