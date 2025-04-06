import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateSchema = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.errors });
      return;
    }
    next();
  };
};

export default validateSchema;
