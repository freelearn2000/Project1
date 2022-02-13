import { Request, Response, NextFunction } from 'express';
declare const valMiddleware: (validator: any, options?: {}) => (req: Request, res: Response, next: NextFunction) => void;
export default valMiddleware;
