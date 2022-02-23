import express, {Request, Response, NextFunction} from "express";
import { MyError, ApiNotImplementedError, NotImplementedError } from "../shared/common";



export const errorHandlingMiddleware = (error: MyError, request: Request, response: Response, next: NextFunction) => {
    
    response.status(error.status).send( {message: error.message} );
}

//  // Handle all API's (not handled by routes)
//  this.express.all( '/api/*', ( req: Request, res: Response ) => {
//     throw new ApiNotImplementedError( `${req.method} on ${req.path} not implemented!`, `Main- Bad API request` );
// });

// // Handle all GET requets not handled by Routes
// this.express.get( '*', ( req: Request, res: Response) => {
//     res.send( "Welcome to NodeApp" );
// });

// // Handle all other (POST, PATCH, DELETE) requets not handled by Routes
// this.express.all( '*', (req: Request, res: Response ) => {
//     throw new NotImplementedError( `Not implemented`, `Main- Bad request` );
// });
