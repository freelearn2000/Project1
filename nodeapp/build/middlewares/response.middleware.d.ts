import { RequestHandler } from 'express';
declare const responseMiddleware: () => RequestHandler;
export default responseMiddleware;
