// const express =require("express");
import express from "express"  

import authRoutes from "./routes/auth.route.js" //.js because we are using type="module"

import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"

dotenv.config()
const PORT=process.env.PORT

const app=express();
app.use(express.json);//allows to extract json data of body



app.use("/api/auth",authRoutes)








app.listen(PORT,()=>{
    console.log("Runing at port:"+PORT);
    connectDB();
})
