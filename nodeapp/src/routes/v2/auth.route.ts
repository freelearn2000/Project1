import { Request, Response, NextFunction } from "express";
import { handleAsync, AuthenticationError } from '../../shared/common';
import Jwt from 'njwt';
import nconf from '../../shared/config';
import validationMiddleware from '../../middlewares/validation.middleware';
import { AuthService } from '../../services/v1/auth.service';
import { BaseRoute } from '../v1/index.route';


export class AuthRoute extends BaseRoute {

    public service: AuthService;

    constructor( validator: any, service: any ) {
        super();
        this.service = service;
        this.router.post(`/`, validationMiddleware(validator), this.create);
    }
    
    // API Endpoint '/auth'
    public create = async(request: Request, response: Response, next: NextFunction) => {

        const model = request.body;

        // Call service
        const [ users, error ] = await handleAsync( this.service.find(model) );
        if ( error ) return next( error );

        if ( users.length ) {
            
            // User is authenticated (login is successful!)
            // Create a jwt token & add it to headers
            // Expiry in 2 minutes = 2x60x1000 = 120000
            const payload = users[0].id;
            const claims = {iss: 'auth.google.com', sub: payload};
            const token = Jwt.create(claims, nconf.get('jwt:secret'), nconf.get('jwt:algorithm'));
            token.setExpiration( new Date().getTime() + nconf.get('jwt:expiresIn') );

            users.push( {token: token.compact()} );

            response.json( users );
        } else {
            next( new AuthenticationError(null, `auth.route->post`) );
        }
    };
}
