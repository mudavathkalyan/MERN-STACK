// const express =require("express");
import express from "express"  

import authRoutes from "./routes/auth.route.js" //.js because we are using type="module"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";

dotenv.config()// with config we can access env variables
const PORT=process.env.PORT

const app=express();
app.use(express.json());//allows to extract json data of body
app.use(cookieParser());//allow to parse cookie


app.use("/api/auth",authRoutes);

app.use("/api/message",messageRoutes);



app.listen(PORT,()=>{
    console.log("Runing at port:"+PORT);
    connectDB();
})
