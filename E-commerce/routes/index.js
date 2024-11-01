const express=require("express");
const userModel = require("../models/userModel");
const isLoggedin = require("../middlewares/isLoggedin");
const router=express.Router();
const jwt=require('jsonwebtoken');
const productModel = require("../models/productModel");

router.get("/",(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error});
});

router.get("/cart", async (req, res) => {
    const token = req.cookies.token;

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            req.flash("error", "Invalid or expired token.");
            return res.redirect("/login");
        }

        // Extract user information from the decoded token
        req.user = decoded;

        try {
            // Find the user by email and populate the cart details
            let user = await userModel
                .findOne({ email: req.user.email })
                .populate("cart");

            // Render the cart page and pass the populated cart to the template
            res.render("cart", { user });
        } catch (error) {
            console.error("Error retrieving cart:", error);
            req.flash("error", "Failed to load cart.");
            res.redirect("/shop");
        }
    });
});

router.get("/shop",isLoggedin,async(req,res)=>{
    let user=await userModel.findOne({email:email});
    const products= await productModel.find().lean(); // Add .lean() to convert to plain objects
    res.render("shop",{products,users:user});
    
});

module.exports=router;