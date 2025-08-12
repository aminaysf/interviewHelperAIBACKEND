import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate req.body against the schema
      schema.parse(req.body);
      next(); // Validation passed, proceed to the next middleware
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Extract the first error using issues
        const firstError = err.issues[0];
        res.status(400).json({
          message: firstError.message,
        });
      } else {
        next(err); // Pass non-validation errors to the error handler
      }
    }
  };

export default validateBody;