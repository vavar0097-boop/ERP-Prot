import { Router } from "express";
import { deliveryOrderController } from "./delivery-order.controller.js";

const router = Router();

router.get("/", deliveryOrderController.list);

export const deliveryOrderRoutes = router;
