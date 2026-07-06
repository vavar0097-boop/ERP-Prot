import { Router } from "express";
import { stockController } from "./stock.controller.js";

const router = Router();

router.get("/", stockController.list);
router.get("/movements", stockController.movements);
router.get("/locations", stockController.locations);

export const stockRoutes = router;
