// aqui van las rutas (Post/ register Post / login )
import express, { Router } from "express";
import validateSchema from "../middleware/validateSchema";
import { registerSchema, loginSchema } from "Schemas";
// missing controlers here now

const router: Router = express.Router();

// routes for Auth

router.post("/login", validateSchema(loginSchema));
router.post("/register", validateSchema(registerSchema));

export default router;
