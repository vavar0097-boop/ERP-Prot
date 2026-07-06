import { Router } from "express";
import { supplierController } from "./supplier.controller.js";

const router = Router();

router.get("/", supplierController.list);
router.post("/", supplierController.create);

export const supplierRoutes = router;
