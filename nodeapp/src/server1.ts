// Load configuration informations first!
// import nconf from './shared/config';
// import logger from './shared/logger';

import express, {Request, Response} from "express";
// import {Response} from 'express';
// // import path from 'path';
// import routerUsers from './routes/v1/users.route';
// import routerAuthV1 from './routes/v1/auth.route';
// import routerAuthV2 from './routes/v2/auth.route';
// // import { createConnection } from 'typeorm';
// // import config from './typeormconfig';
// import responseMiddleware from './middlewares/response.middleware';
// import loggingMiddleware from './middlewares/logging.middleware';
// import { NotImplementedError } from './shared/common';
// import { ApiNotImplementedError } from './shared/common';


 
// const API_PREFIX_V1 = `/api/v1`;
// const API_PREFIX_V2 = `/api/v2`;
// const PORT = process.env.PORT || 3000;

const server = express( );

// server.use( express.json() );

// server.get('/api/users', (request: Request, response: Response) => {
//     response.send('Welcome to our User APIs!');
// });

server.post('/api/users', (request: Request, response: Response) => {

    // Retreive username & passowrd from body
    const {username, password} = request.body;

    // Validate the data retreived
    if (!username || !password) {
        response.send(400);
        return;
    }

    // Save to db & collect user info & send to client
    response.send({userId: "USR0001"});
});

// logger.info( `Environment : ${nconf.get('NODE_ENV')}` );


// Connect Adaptor to Persistance Layer (PostGres)
// async/await (2015 - ES6)
// Promise (2015 - ES6)

// Using Promise
// createConnection( config )
//     .then( ( ) => logger.info(`Adaptor connected...`) )
//     .catch( (error) => logger.error(`Adaptor failed to connect : `, error) );

// Using async/await
// async function connectToPostGres( ) {
//     try {
//         await createConnection(config);
//         console.log(`Connection successful!`);
//     } catch( error ) {
//         console.log(`Connection failed : `, error);
//     }
// }
// connectToPostGres( );

// Logging middleware
// server.use( loggingMiddleware() );

// Response Formatter
// server.use( responseMiddleware() );

// Add Routes
// server.use( `${API_PREFIX_V1}/auth`, routerAuthV1 );
// server.use( `${API_PREFIX_V2}/auth`, routerAuthV2 );
// server.use( `${API_PREFIX_V1}/users`, routerUsers );

// Handle all API's (not handled by routes)
// server.all( '/api/*', (req: any, res: any ) => {
//     throw new ApiNotImplementedError( `API ${req.method} on ${req.path} not implemented!`, `Main-Bad api request` );
// });

// Welcome message
// server.get( `*`, (req: any, res: any ) => {
//     res.status( 200 ).send( {message: `Welcome to Our Application!`} );
// } );

// Handle GET requests not handled by Routes, send React Application to Client
// server.get( '*', (req, res) => {
//     res.sendFile( path.resolve(__dirname, '../../node-project-2/src/client/index.html') );
// });

// Handle All other (POST, PATCH, DELETE) requets not handled by Routes
// server.all( '*', (req: any, res: any ) => {
//     throw new NotImplementedError( `Not implemented`, `Main-Bad request` );
// });

// Global error handler
// server.use( (error: any, req: any, res: Response, next: any) => {

//     // res.send( {status: error.status, message: `Error occured!`} );
//     res.status( error.status ).send( {message: error.message} );

//     // Further log the Error Message & Origin to persistance layer (analytics)
//     logger.error( `Status: ${error.status}, Origin: ${error.origin}, Error: ${error.message}` );
// });

// server.listen( PORT, ( ) => {
//     logger.info(`Server running at ${PORT}....`);
// });

export default server;
