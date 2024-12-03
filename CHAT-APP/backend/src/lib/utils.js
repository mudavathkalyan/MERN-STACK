
import jwt from "jsonwebtoken";

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"5d"});

    res.cookie("jwt",token,{
        maxAge:5*24*60*60*1000,//in milli sec
        httpOnly:true, 
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development",
    });
}