import { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../utils/api-response.js";

export const healthController = {
  check: async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      res.status(200).json(
        apiResponse.success("API is healthy", {
          service: "erp-besi-api",
          status: "ok",
        })
      );
    } catch (error) {
      _next(error);
    }
  },
};
