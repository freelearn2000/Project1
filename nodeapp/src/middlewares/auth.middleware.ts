import { Request, Response, NextFunction, RequestHandler } from 'express';
import Jwt from 'njwt';
import nconf from '../shared/config';
import { AuthenticationError } from '../shared/common';


const authMiddleware = ( ): RequestHandler => {

    return ( req: Request, res: Response, next: NextFunction ) => {
        
        // Retreive token from header key
        const token: any = req.header( nconf.get('jwt:headerKey') );

        if ( token ) {

            // Verify token is not tampered!
            Jwt.verify( token, nconf.get('jwt:secret'), nconf.get('jwt:algorithm'), 
                ( error: any, verifiedJwt: any ): any => {
                    if ( error ) {
                        next( new AuthenticationError(error.message, `auth.middleware->authMiddleware`) );
                    } else {
                        // jwt is valid!!
                        // 1. Get User (id) from token
                        // 2. Check User has permissions to do req.method operation
                        //     If yes -> next( )
                        //     If no -> next( new AuthorizationError(403) )
                        next( );
                    }
                });

        } else {
            next( new AuthenticationError(`Jwt token not present!`, `auth.middleware->authMiddleware`) );
        }
    }
}

export default authMiddleware;
