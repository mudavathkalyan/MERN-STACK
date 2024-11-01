const express = require("express");
const router = express.Router();

const {registerUser,loginUser,logout}=require("../controllers/authController");
const isLoggedin = require("../middlewares/isLoggedin");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");



// Route to check if the user route is working
router.get("/", (req, res) => {
    res.render("user");
});

// Render sign-in page
// router.get("/signin", (req, res) => {
//     // res.render("signin");
// });
// User registration route (suggest renaming to `/register`)



// Route to handle adding product to cart
router.post("/addtocart", isLoggedin, async (req, res) => {

    console.log("Adding product to cart");
    try {
        // Find the user by email (assuming req.user contains user details after authentication)
        let user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/login"); // Redirect to login if user not found
        }

        // Add product ID to user's cart and save
        user.cart.push("123432");
        await user.save();

        req.flash("success", "Product added to cart successfully");
        res.redirect("/shop"); // Redirect back to the shop or any appropriate page
    } catch (err) {
        console.error("Error adding product to cart:", err);
        req.flash("error", "Could not add product to cart");
        res.redirect("/shop");
    }
});


//adding products to carts
router.post("/cart", async (req, res) => {

    try {
        const {pid, email } = req.body;
        // Find the user by email
        let user = await userModel.findOne({ email });

        if (!user) {
            req.flash("error", "User not found");
            console.log("User not found");
            return res.redirect("/login"); // Redirect to login if user not found
        }

        // Add product ID to user's cart and save
        user.cart.push(pid);
        await user.save();

        req.flash("success", "Product added to cart successfully");
        const products= await productModel.find().lean(); // Add .lean() to convert to plain objects
        res.render("shop",{products,users:user});
    } catch (err) {
        console.error("Error adding product to cart:", err);
        req.flash("error", "Could not add product to cart");
        res.redirect("/shop");
    }
});


router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logout);

module.exports = router;
