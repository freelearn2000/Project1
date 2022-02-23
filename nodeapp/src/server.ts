import express, {Request, Response} from "express";
import { createConnection } from 'typeorm';
import config from './typeorm.config';
import routerWeather from './routes/v1/weather.route';
import routerBlogs from './routes/v1/blogs.route';
import routerProjects from './routes/v1/projects.route';
import routerNews from './routes/v1/news.route';
import routerBooks from './routes/v1/books.route';
import routerProducts from './routes/v1/products.route';
import logger from "./shared/logger";
import { ApiNotImplementedError, NotImplementedError } from "./shared/common";


export class Server {

    public express: any = null;

    constructor( ) {
        console.log(`Initializing application...`);
        this.express = express( );
        this.registerMiddlewares();
        this.registerRoutes();
        this.errorHandler();  
    }

    public async initializeDatabase( ) {
        try {
            await createConnection(config);
            console.log(`Database connected!`);
        } catch( error ) {
            console.log(`Database connection failed : `, error);
            throw error;
        }
    }

    private registerMiddlewares( ) {
        this.express.use( express.json() );
    }

    private registerRoutes( ) {
        this.express.use(`/api/v1/blogs`, routerBlogs)
        this.express.use( `/api/v1/projects`, routerProjects);
        this.express.use( `/api/v1/weather`, routerWeather); 
        this.express.use( `/api/v1/news`, routerNews);
        this.express.use( `/api/v1/books`, routerBooks);
        this.express.use( `/api/v1/products`, routerProducts);
    }
  
    private errorHandler() {

        // Handle all API's (not handled by routes)
        this.express.all( '/api/*', ( req: Request, res: Response ) => {
            throw new ApiNotImplementedError( `${req.method} on ${req.path} not implemented!`, `Main- Bad API request` );
        });

        // Handle all GET requets not handled by Routes
        this.express.get( '*', ( req: Request, res: Response) => {
            res.send( "Welcome to NodeApp" );
        });

        // Handle all other (POST, PATCH, DELETE) requets not handled by Routes
        this.express.all( '*', (req: Request, res: Response ) => {
            throw new NotImplementedError( `Not implemented`, `Main- Bad request` );
        });

        // Global Error Handler
        this.express.use( (error: any, req: Request, res: Response, next: any) => {
            res.status( error.status ).send( { message: error.message } );
            // Further log the Error Message & Origin to persistance layer (analytics)
            logger.error( `Status: ${error.status}, Origin: ${error.origin}, Error: ${error.message}` );
        });
    }

    public listen( port: number ) {
        this.express.listen(port, () => {
            console.log(`Server running at ${port}....`)
        })
    }
}
