export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly detals?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    detals?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.detals = detals;

    Error.captureStackTrace(this);
  }
}

//Not Found Error
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}
//Validation Error
export class ValidationError extends AppError {
  constructor(message = "Invalid request data", detals?: any) {
    super(message, 400, true, detals);
  }
}
//Bad Request Error
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
//Unauthorized Error
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
//Forbidden Error
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden access") {
    super(message, 403);
  }
}
//Database Error
export class DatabaseError extends AppError {
  constructor(message = "Database error", detals?: any) {
    super(message, 500, true, detals);
  }
}
//Rate Limit Error
export class RateLimitError extends AppError {
  constructor(message = "Too many requests, please try again later") {
    super(message, 429);
  }
}
