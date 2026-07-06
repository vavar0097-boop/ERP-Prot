import { Router } from "express";
import { salesOrderController } from "./sales-order.controller.js";

const router = Router();

router.get("/", salesOrderController.list);
router.post("/", salesOrderController.create);

export const salesOrderRoutes = router;
