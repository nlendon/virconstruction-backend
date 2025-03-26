import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
      headers: req.headers,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(405).json({
        status: 405,
        message: error.errors[0].message,
      });
    }
    next(error);
  }
};
