const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");


// Route to create a new product
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/owners/admin");
    }
});


module.exports = router;
