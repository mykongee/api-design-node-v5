import type { Request, Response, NextFunction } from 'express';
import { type ZodSchema, ZodError } from 'zod';

// validate req/res body
export const validateBody = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json({
                    error: 'Validation error',
                    details: e.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message,
                    }))
                });
            }
            next(e);
        }
    }
}

export const validateParams = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.params);
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json({
                    error: 'Invalid route parameters',
                    details: e.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message,
                    }))
                });
            }
            next(e);
        }
    }
}

export const validateQuery = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.query);
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json({
                    error: 'Invalid URL query parameters',
                    details: e.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message,
                    }))
                });
            }
            next(e);
        }
    }
}
