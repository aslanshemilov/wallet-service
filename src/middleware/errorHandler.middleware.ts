import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("This is my custom error handler middleware");
  const statusCode = err.status ?? 500;
  const message = err.message || "Something went wrong.";
  console.log(statusCode, message);
  return res.status(statusCode).json({
    error: statusCode,
    message: message,
  });
};
