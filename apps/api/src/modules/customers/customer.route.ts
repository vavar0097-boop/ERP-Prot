import { Router } from "express";
import { customerController } from "./customer.controller.js";

const router = Router();

router.get("/", customerController.list);
router.post("/", customerController.create);

export const customerRoutes = router;
