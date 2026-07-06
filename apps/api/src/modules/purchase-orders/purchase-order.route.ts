import { Router } from "express";
import { purchaseOrderController } from "./purchase-order.controller.js";

const router = Router();

router.get("/", purchaseOrderController.list);
router.post("/", purchaseOrderController.create);

export const purchaseOrderRoutes = router;
