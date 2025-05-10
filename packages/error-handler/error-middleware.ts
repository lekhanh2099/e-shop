import { AppError } from ".";
import { Request, Response } from "express";

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    console.error(
      `AppError occurred: ${req.method} ${req.url} - ${err.message}`
    );
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log("Unhandled error occurred:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
    details: err.message,
  });
};
