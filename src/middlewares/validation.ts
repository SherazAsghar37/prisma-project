import { NextFunction } from "express";
import { singleton } from "tsyringe";
import { ZodError, z } from "zod";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Request, Response } from "express";

@singleton()
export default class Validation {
  public userLoginValidator = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    try {
      const user = req.body;

      userSchema.parse(user);
      return next();
    } catch (error) {
      if (error instanceof ZodError) return zodErrorHandler(error, res);
    }
  };
}

function zodErrorHandler(error: ZodError, res: Response): Response {
  const response = error.errors.map((err) => {
    return {
      field: err.path.join("."),
      message:
        err.message === "Request"
          ? `Field ${err.path.join(".")} is required`
          : err.message,
    };
  });
  return res.status(HttpStatusCode.FORBIDDEN).json({
    message: "validation failed",
    error: response,
  });
}
