import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({message:"unAthorized-No token found"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded)
        {cloudinary
            return res.status(401).json({message:"unothorized-token not Match"});
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user=user;
        next();
    }catch(error){
        console.log("Error at  protectroute middleware",error);
        return res.status(500).json({message:"Internaml error"});
    }
}