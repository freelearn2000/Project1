import { RequestHandler } from 'express';
declare const authMiddleware: () => RequestHandler;
export default authMiddleware;
