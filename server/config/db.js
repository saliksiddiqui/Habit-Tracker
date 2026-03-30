import mongoose from "mongoose"

export const connectDb = () => {
    try{
        mongoose.connect(process.env.DB_URL);
        console.log("database is connected");
        
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}