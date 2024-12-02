import express from "express"
import { login, logut, signup } from "../controllers/auth.controller.js";
//remember .js extension becoz we using "type"="module"


const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logut);

export default router;