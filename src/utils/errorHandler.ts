import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ERROR_CODES } from "../types/errorCodes";
import { apiError } from "./apiResponses";
import { logger } from "./logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof ZodError) {
    logger.warn("Validation error", {
      path: req.path,
      method: req.method,
      issues: err.issues
    });

    return res.status(400).json(
      apiError(
        "Request validation failed",
        ERROR_CODES.VALIDATION_ERROR,
        { issues: err.issues }
      )
    );
  }

  if (err.code && ERROR_CODES[err.code as keyof typeof ERROR_CODES]) {
    logger.info("Application error", {
      code: err.code,
      message: err.message,
      path: req.path
    });

    return res.status(400).json(
      apiError(err.message, err.code)
    );
  }


  logger.error("Unhandled system error", {
    message: err.message,
    stack: err.stack,
    path: req.path
  });

  return res.status(500).json(
    apiError(
      "Internal server error",
      ERROR_CODES.INTERNAL_SERVER_ERROR
    )
  );
}
