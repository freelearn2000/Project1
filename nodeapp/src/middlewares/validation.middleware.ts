import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from  'class-validator'
import { plainToClass } from  'class-transformer'
import { DataValidationError } from '../shared/common';


const valMiddleware = ( validator: any, options = {} ) => {

    return ( req: Request,res: Response, next: NextFunction )  =>  {

        validate( plainToClass(validator, req.body), {...options, forbidNonWhitelisted: true, whitelist: true} )
            .then( (errors: ValidationError[] ) => {

                if ( errors.length ) {

                    const messages: any = errors.map(
                        ( error: ValidationError ) => {

                            const constraints: any = error.constraints;
                            return Object.values( constraints ).join(' ; ');
                        }
                    ).join(' ; ');

                    // Validation failed!
                    next( new DataValidationError( messages, 'val.middleware->valMiddleware') );
                
                } else {

                    // Validation succeeded, move to next middleware
                    next( );
            }

        } )
        .catch( error => {
            next( new DataValidationError( error.message, 'val.middleware->valMiddleware') );
        });
    }
}
            
        
export default valMiddleware;