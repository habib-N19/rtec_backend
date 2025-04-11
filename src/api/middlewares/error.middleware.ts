import type { NextFunction, Request, Response } from "express";

import { logger } from "../../utils/logger.js";

export const createAppError = (
  message: string,
  statusCode: number,
): Error & { statusCode: number; isOperational: boolean } => {
  const error = new Error(message) as Error & {
    statusCode: number;
    isOperational: boolean;
  };
  error.statusCode = statusCode;
  error.isOperational = true;
  Error.captureStackTrace(error, createAppError);

  return error;
};

export const errorMiddleware = (
  err: Error & { statusCode: number; isOperational: boolean },
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  if (err.stack) logger.error(err.stack);

  if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      res.status(statusCode).json({
        status: "error",
        message: err.message,
      });
      return;
    }
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
    return;
  }
  res.status(statusCode).json({
    status: "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

type ExpressResponse = undefined | Response | Promise<undefined | Response>;

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => ExpressResponse,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const setupUnhandledExceptionHandlers = () => {
  process.on("uncaughtException", (err: Error) => {
    logger.error("UNHANDLED EXCEPTION! 💥 Shutting down...");
    logger.error(err.name, err.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (err: Error) => {
    logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
    logger.error(err.name, err.message);
    process.exit(1);
  });
};
