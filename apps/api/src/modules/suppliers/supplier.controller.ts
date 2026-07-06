import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { supplierService } from "./supplier.service.js";
import { createSupplierSchema } from "./supplier.validator.js";

export const supplierController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const suppliers = await supplierService.list();
      res.json(apiResponse.success("Suppliers retrieved successfully", suppliers));
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createSupplierSchema.parse(req.body);
      const supplier = await supplierService.create(payload);
      res.status(201).json(apiResponse.success("Supplier created successfully", supplier));
    } catch (error) {
      next(error);
    }
  },
};
