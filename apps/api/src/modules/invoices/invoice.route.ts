import { Router } from "express";
import { invoiceController } from "./invoice.controller.js";

const router = Router();

router.get("/", invoiceController.list);

export const invoiceRoutes = router;
