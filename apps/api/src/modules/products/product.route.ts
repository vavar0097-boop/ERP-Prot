import { Router } from "express";
import { productController } from "./product.controller.js";

const router = Router();

router.get("/", productController.list);
router.post("/", productController.create);

export const productRoutes = router;
