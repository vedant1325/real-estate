import express from 'express'
import cors from "cors"
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/database.js';
import router from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';



const app=express();
const port=process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
const allowedOrigins=['http://localhost:5173','http://localhost:5174']
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            // Allow requests with no origin (e.g., mobile apps or Postman)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
connectDB();



app.get('/',(req,res)=>{
    res.send("API working")
});
app.use('/api/user',router);
app.use('/api/admin',adminRouter);

app.listen(port,()=>{
    console.log(`Server started on PORT ${port}`);
})
 //mongodb+srv://vedantdange:vedant@2003@cluster0.rqhbb.mongodb.net/