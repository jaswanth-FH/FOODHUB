import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ERROR_CODES } from "../types/errorCodes";
import {logger } from "../utils/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      code: ERROR_CODES.VALIDATION_ERROR,
      message: "Request validation failed",
      data: null,
      meta: {
        issues: err.issues.map(e => ({
          path: e.path.join("."),
          message: e.message
        }))
      }
    });
  }


  if (err && err.code) {
    return res.status(404).json({
      status: "error",
      code: err.code,
      message: err.message,
      data: null,
      meta: null
    });
  }


  logger.error("Unhandled system error", {
    message: err?.message,
    stack: err?.stack,
    path: req.path
  });

  return res.status(500).json({
    status: "error",
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
    data: null,
    meta: null
  });
}
