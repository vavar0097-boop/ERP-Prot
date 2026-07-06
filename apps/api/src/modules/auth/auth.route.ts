import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

router.post("/login", authController.login);
router.get("/me", authController.me);

export const authRoutes = router;
