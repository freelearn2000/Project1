import express, { Request, Response, NextFunction } from "express";
import { handleAsync, AuthenticationError } from '../../shared/common';
import Jwt from 'njwt';
import nconf from '../../shared/config';
import { AuthService } from '../../services/auth.service'
import { Route } from "./index.route";


export class AuthRoute1 extends Route {

    public router = express.Router( );
    public service: AuthService;
    
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
            const claims = {iss: nconf.get('jwt:issuer'), sub: payload};
            const token = Jwt.create(claims, nconf.get('jwt:secret'), nconf.get('jwt:algorithm'));
            token.setExpiration( new Date().getTime() + nconf.get('jwt:expiresIn') );

            users.push( {token: token.compact()} );

            response.json( users );
        } else {
            next( new AuthenticationError(null, `auth.route->post`) );
        }
    }
}
