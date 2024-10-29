import {Response , ErrorRequestHandler , NextFunction , Request} from 'express'
import { z } from "zod";
// import AppError from "../utils/AppError";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
// import { REFRESH_PATH, clearAuthCookies } from "../utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({
    errors,
    message: error.message,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => 
    {
  console.log(`PATH ${req.path}`, error);

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  return res.status(INTERNAL_SERVER_ERROR).json ({
    message : "INTERNAL SEVER ERROR"
  });
};

export default errorHandler;