import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { customerService } from "./customer.service.js";
import { createCustomerSchema } from "./customer.validator.js";

export const customerController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await customerService.list();
      res.json(apiResponse.success("Customers retrieved successfully", customers));
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createCustomerSchema.parse(req.body);
      const customer = await customerService.create(payload);
      res.status(201).json(apiResponse.success("Customer created successfully", customer));
    } catch (error) {
      next(error);
    }
  },
};
