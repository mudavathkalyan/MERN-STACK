import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup=async (req,res)=>{
     const {fullName,email,password}=req.body;
   try{
        if(password.length <6)
        {
            return res.status(400).json({message:"Password must be of atleast characters"});
        }
        const user=await User.findOne({email});
        
        if(user) return res.status(400).json({message:"User already exists"});
        //if user not found
        //hash passwors ans do signup
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            //generate jwt
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message:"Invalid user,Retry."});
        }
   }catch(error){
        console.log("Error At Signup controller",error.message);
   }
};

export const login=(req,res)=>{
    res.send("login")
};

export const logut=(req,res)=>{
    res.send("logout")
};
