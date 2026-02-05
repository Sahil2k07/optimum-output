import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/abstract.js";

function errorFilter(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal server error";

  console.error(
    "\n\x1b[31m[ERROR]\x1b[0m",
    "\n\x1b[90mTime:\x1b[0m",
    new Date().toISOString(),
    "\n\x1b[90mMethod:\x1b[0m",
    req.method,
    "\n\x1b[90mPath:\x1b[0m",
    req.originalUrl,
    "\n\x1b[90mStatus:\x1b[0m",
    statusCode,
    "\n\x1b[90mMessage:\x1b[0m",
    err.message,
    "\n\x1b[90mStack:\x1b[0m",
    !isAppError ? err.stack : "Operational error (stack hidden)",
    "\n",
  );

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV?.toLowerCase() === "development" && {
        stack: err.stack,
      }),
    },
  });
}

export default errorFilter;
