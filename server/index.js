import dotenv from 'dotenv';
import express from 'express';
import { connectDb } from './config/db.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/user', authRoutes);

// app.get("/", (req, res)=>{
//     res.status(200).json({'hellow':'salik'})
// })

connectDb();

app.listen(process.env.PORT, ()=>{
    console.log('server is started?');
})

export default app;