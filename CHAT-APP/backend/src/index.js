// const express =require("express");
import express from "express"  

import authRoutes from "./routes/auth.route.js" //.js because we are using type="module"

import dotenv from "dotenv"
dotenv.config()
const PORT=process.env.PORT


const app=express();


app.use("/api/auth",authRoutes)








app.listen(PORT,()=>{
    console.log("Runing at port:"+PORT);
})
