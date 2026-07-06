import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { apiResponse } from "../utils/api-response.js";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: Error | AppError | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(
      apiResponse.error(error.message, error.errors)
    );
  }

  if (error instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    error.errors.forEach((err) => {
      const path = err.path.join(".");
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });
    return res.status(422).json(
      apiResponse.error("Validation error", errors)
    );
  }

  res.status(500).json(
    apiResponse.error("Internal server error")
  );
};
