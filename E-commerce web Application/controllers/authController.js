
const userModel = require("../models/userModel");
const ownerModel=require("../models/ownerModel");
const productModel=require("../models/productModel");

const bcrypt = require('bcrypt'); //for hash password

const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const { generateToken } = require("../utils/generateToken")


//sign in user
module.exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.redirect("/");
        }
        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err)
                    return res.send(err.message);
                else {
                    // res.send(hash);
                    const user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });
                    // console.log("User registered successfully, redirecting to sign-in page.");
                    // res.redirect("/signin");  // Redirect to the sign-in page instead

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/");
                }
            });
        })
    } catch (err) {
        console.error("Error during registration:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

//login user
module.exports.loginUser=async(req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email:email});
    if(!user)
    {
        req.flash("error","Incorrect Email or Password..");
        return res.redirect("/");
    }
    bcrypt.compare(password,user.password,async (err,result)=>{
        //if passwords also matches
    if(result)
    {
        let token=generateToken(user);
        res.cookie("token",token);

        const products= await productModel.find().lean(); // Add .lean() to convert to plain objects
        res.render("shop",{products,users:user});

    }  
    else
    {
        return res.send("Incorrect Email or Password..");
    }      
    })
};
//admin signin
module.exports.registerAdmin=async(req,res)=>{
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await ownerModel.findOne({ email });
        if (existingUser) {
            return res.redirect("/");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err)
                    return res.send(err.message);
                else {
                    // res.send(hash);
                    const user = await ownerModel.create({
                        fullname,
                        email,
                        password: hash,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send(token);
                }
            });
        })
    } 
    catch (err) {
        console.error("Error during registration:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

//login ADMIN
module.exports.loginAdmin=async(req,res)=>{
    let {email,password}=req.body;
    let admin=await ownerModel.findOne({email:email});
    if(!admin)
    {
        req.flash("error","Incorrect Email or Password.");
        return res.redirect("/");
    }
    bcrypt.compare(password,admin.password,(err,result)=>{
        //if passwords also matches
    if(result)
    {
        let token=generateToken(admin);
        res.cookie("user", { fullname: admin.fullname, email: admin.email }, { httpOnly: true });
        res.render("createProduct",{users:admin});
    }  
    else
    {
        return res.send("Incorrect Email or Password..");
    }      
    })
};


//logout
module.exports.logout=async(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}
