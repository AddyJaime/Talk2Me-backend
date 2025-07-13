import express, { Router } from "express";
import { getAllUsers } from "@src/controllers/getAllUsers";

const router: Router = express.Router()

router.get("/search", getAllUsers)

export const userRoutes = router