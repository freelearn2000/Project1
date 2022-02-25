import express, {Request, Response, NextFunction} from "express";
import { MyError, ApiNotImplementedError, NotImplementedError } from "../shared/common";


 // Handle all API's (not handled by routes)
export const handleAllapi = ( request: Request, response: Response ) => {
    throw new ApiNotImplementedError( `${request.method} on ${request.path} not implemented!`, `Main- Bad API request` );
};

// Handle all GET requets not handled by Routes
export const handleAllGETrequets = ( request: Request, response: Response ) => {
    response.send( "Welcome to NodeApp" );
};

// Handle all other (POST, PATCH, DELETE) requets not handled by Routes
export const handleAllOtherRequets = ( request: Request, response: Response ) => {
    throw new NotImplementedError( `Not implemented`, `Main- Bad request` );
};

export const errorHandlingMiddleware = (error: MyError, request: Request, response: Response, next: NextFunction) => {
    
    response.status(error.status).send( {message: error.message} );
}
