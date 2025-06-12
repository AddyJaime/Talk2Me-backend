import express, { Router } from "express";
import validateSchema from "../middleware/validateSchema";
import { registerSchema, loginSchema } from "Schemas";
import { login } from "@controllers/authController";
import { register } from "@controllers/authController";


const router: Router = express.Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);


export const authRoutes = router;
