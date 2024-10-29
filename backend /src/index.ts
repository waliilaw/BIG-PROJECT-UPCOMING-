import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express';
import connectToDatabase from './config/db'
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler'
import catchErrors from './utils/catchError';
import authRoutes from './routes/auth.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true }))
app.use(
    cors({
        origin : APP_ORIGIN,
        credentials : true ,
    })
)
app.use(cookieParser())


app.get("/" , catchErrors(async function(req, res ,next){
    
    return res.status(200).json({
        message : "Working re"
    })
}))
app.use("/auth" , authRoutes);

app.use(errorHandler);

app.listen(PORT , async () =>{
    await connectToDatabase()
    console.log(`Server is running on ${PORT}`)})