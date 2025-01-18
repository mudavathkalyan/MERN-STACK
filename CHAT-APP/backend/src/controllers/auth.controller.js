import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { cloudinary } from "../lib/cloudinary.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://your-frontend-domain.com", // Replace with your frontend URL
        credentials: true,
    })
);

// JWT Token Generator
export const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("jwt", token, {
        httpOnly: true, // Prevents client-side JS access
        secure: process.env.NODE_ENV === "production", // Send over HTTPS in production
        sameSite: "strict", // Prevent CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};


// Signup
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user, please try again." });
        }
    } catch (error) {
        console.error("Error at Signup Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error at Login Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Logout
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // Expire immediately
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error at Logout Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// // Update Profile
// export const updateProfile = async (req, res) => {
//     try {
//         const { profilePic } = req.body;
//         const userId = req.user._id; // Assuming middleware sets `req.user`

//         if (!profilePic) {
//             return res.status(400).json({ message: "Profile picture is required" });
//         }

//         const uploadResponse = await cloudinary.uploader.upload(profilePic); // Upload to Cloudinary
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { profilePic: uploadResponse.secure_url },
//             { new: true }
//         );

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error("Error at Update Profile Controller:", error.message);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id; // Assuming middleware sets `req.user`

        if (profilePic === null) {
            // If profilePic is null, clear the profile picture
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: null },
                { new: true }
            );

            // Return updated user without profile picture
            const { _id, email, fullName } = updatedUser;
            return res.status(200).json({ _id, email, fullName, profilePic: null });
        }

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        // Validate base64 format
        if (!/^data:image\/(png|jpeg|jpg);base64,/.test(profilePic)) {
            return res.status(400).json({ message: "Invalid image format" });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "profiles",
            width: 200,
            height: 200,
            crop: "thumb",
            gravity: "face",
        });

        // Update in database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        // Return updated user with new profile picture
        const { _id, email, fullName, profilePic: updatedProfilePic } = updatedUser;
        res.status(200).json({ _id, email, fullName, profilePic: updatedProfilePic });
    } catch (error) {
        console.error("Error at Update Profile Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Check Auth
export const checkAuth = (req, res) => {
    try {
        res.status(200).json({ user: req.user }); // Assuming middleware sets `req.user`
    } catch (error) {
        console.error("Error at Check Auth Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default app;
