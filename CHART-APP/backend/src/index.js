// const express =require("express");
import express from "express"  

import authRoutes from "./routes/auth.route.js" //.js because we are using type="module"



const app=express();


app.use("/api/auth",authRoutes)








app.listen(5001,()=>{
    console.log("At port 5001");
})
