import { Request, Response } from "express";
import { apiResponse } from "../utils/api-response.js";

export const notFoundMiddleware = (_req: Request, res: Response) => {
  res.status(404).json(
    apiResponse.error("Endpoint not found")
  );
};
