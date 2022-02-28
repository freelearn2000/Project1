import express, {Request, Response, NextFunction} from "express";
import { MyError, ApiNotImplementedError } from "../shared/common";


export const unhandledApiRequests = ( request: Request, response: Response ) => {
    
    throw new ApiNotImplementedError( `${request.method} on ${request.path} not implemented!`, `Main- Bad API request` );
};

export const sendReactApplication = ( request: Request, response: Response ) => {

    // Give React App index.html
};

export const errorHandlingMiddleware = (error: MyError, request: Request, response: Response, next: NextFunction) => {
    
    response.status(error.status).send( {message: error.message} );
}
