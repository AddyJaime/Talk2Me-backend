import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// schema aqui es el parametro que representa login o register cuando se valida wen la ruta

// Cuando especificamos ZodSchema<any>, TypeScript sabe que schema es un esquema de Zod, y podemos acceder a sus métodos sin problemas.
const validateSchema = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.errors });
      // aqui rompe y no continua si esta mal
      return;
    }
    next();
  };
};

export default validateSchema;
