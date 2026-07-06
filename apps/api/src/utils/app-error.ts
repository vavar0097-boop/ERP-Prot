export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const createError = {
  badRequest: (message: string, errors?: Record<string, string[]>) =>
    new AppError(400, message, errors),
  unauthorized: (message = "Unauthorized") => new AppError(401, message),
  forbidden: (message = "Forbidden") => new AppError(403, message),
  notFound: (message = "Not found") => new AppError(404, message),
  conflict: (message = "Conflict") => new AppError(409, message),
  unprocessable: (message: string, errors?: Record<string, string[]>) =>
    new AppError(422, message, errors),
  internal: (message = "Internal server error") => new AppError(500, message),
};
