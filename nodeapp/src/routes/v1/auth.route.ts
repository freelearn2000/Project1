import express from 'express';
import { findResource } from '../../services/auth.service';
import { handleAsync, AuthenticationError } from '../../shared/common';
import Jwt from 'njwt';
import nconf from '../../shared/config';
import validationMiddleware from '../../middlewares/validation.middleware';
import { AuthUserValidator } from '../../models/user.entity';


let router = express.Router( );

// API Endpoint '/users'

router.post(`/`, validationMiddleware(AuthUserValidator), async (req, res, next) => {

    const model = req.body;

    // Call service
    const [ users, error ] = await handleAsync( findResource(model) );
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

        res.json( users );
    } else {
        next( new AuthenticationError(null, `auth.route->post`) );
    }
});


export default router;