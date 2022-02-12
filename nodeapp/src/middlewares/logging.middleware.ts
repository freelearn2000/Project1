import { Request, Response, NextFunction, RequestHandler } from 'express';
import logger from '../shared/logger';


const loggingMiddleware = ( ): RequestHandler => {

    return ( req: Request, res: Response, next: NextFunction ) => {
        
        logger.info( `Request : ${req.method} ${req.path}` );

        next( );
    }
}

export default loggingMiddleware;
