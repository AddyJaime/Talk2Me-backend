// aqui van las rutas (Post/ register Post / login )
import express, { Router } from "express";
import validateSchema from "../middleware/validateSchema";
import { registerSchema, loginSchema } from "Schemas";
import { login } from "@controllers/authController";
import { register } from "@controllers/authController";
// missing controlers here now

const router: Router = express.Router();

// routes for Auth

router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);

export default router;
