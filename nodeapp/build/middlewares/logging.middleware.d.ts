import { RequestHandler } from 'express';
declare const loggingMiddleware: () => RequestHandler;
export default loggingMiddleware;
