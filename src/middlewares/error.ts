import { ErrorRequestHandler } from "express";
import { ApiCustomErros } from "../helpers/ApiCustomErros";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const status = err instanceof ApiCustomErros ? err.statusCode : 500;

  if (res.headersSent) {
    return next(err);
  }
  
  res.status(status).json({ 
    message: err.message,
    status
  });
   
};
