import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { productService } from "./product.service.js";
import { createProductSchema } from "./product.validator.js";

export const productController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.list();
      res.json(apiResponse.success("Products retrieved successfully", products));
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createProductSchema.parse(req.body);
      const product = await productService.create(payload);
      res.status(201).json(apiResponse.success("Product created successfully", product));
    } catch (error) {
      next(error);
    }
  },
};
