const express=require("express");
const router=express.Router();
const ownerModel=require("../models/ownerModel");
const { generateToken } = require("../utils/generateToken")

const {registerAdmin,loginAdmin,logout}=require("../controllers/authController");


const bcrypt=require("bcrypt");
//routes of Development phase
// if(process.env.NODE_ENV==="development")
// {
    router.post("/create",registerAdmin);

router.get("/",(req,res)=>{
    res.render("admin")
})

router.get("/admin",(req,res)=>{
    const users = req.cookies.user; // Access user data from the cookie
    let success = req.flash("success");

    res.render("createProduct", { success, users });

});


router.post("/login",loginAdmin);

router.get("/logout",logout);


module.exports=router;
