// const express =require("express");

import express from "express"
import dotenv from "dotenv"

import cors from  "cors"

import authRoutes from "./routes/auth.route.js" //.js because we are using type="module"

import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";

dotenv.config()// with config we can access env variables from env file
const PORT=process.env.PORT

const app=express();
app.use(express.json());//allows to extract json data of body

app.use(cookieParser());//allow to parse cookie

// app.use(cors(
//     {
//         origin:"http://localhost:5173",
//         credentials:true,
//     }
// ));


// const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));



app.use("/api/auth",authRoutes);//routes signin and login

app.use("/api/message",messageRoutes);
 


app.listen(PORT,()=>{
    console.log("Runing at port:"+PORT);
    connectDB();
})
