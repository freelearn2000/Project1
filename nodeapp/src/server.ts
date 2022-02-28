import express from "express";
import { createConnection } from 'typeorm';
import config from './typeorm.config';
import { WeatherRoute } from '../src/routes/v1/weather.route';
import { NewsRoute } from '../src/routes/v1/news.route'

// import routerProducts from './routes/v1/products.route.ts1';
import { unhandledApiRequests, sendReactApplication, errorHandlingMiddleware } from './middlewares/error.middleware';

import { Route } from './routes/v1/index.route';

import { Blog, BlogValidator } from './models/blog.entity';
import { Book, BookValidator } from "./models/book.entity";
import { Project, ProjectValidator } from "./models/project.entity";
import { Product, ProductValidator } from "./models/product.entity";

import { News, NewsValidator } from './models/news.entity';
import { Weather, WeatherValidator } from './models/weather.entity'; 


export class Server {

    public express: any = null;

    constructor( ) {
        console.log(`Initializing application...`);
        this.express = express( );
        this.registerMiddlewares();
        this.registerRoutes();
        this.registerErrorHandlers();  
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
        this.express.use(`/api/v1/blogs`, new Route(Blog, BlogValidator).router)
        this.express.use( `/api/v1/projects`, new Route(Project, ProjectValidator).router);
        this.express.use( `/api/v1/weather`, new WeatherRoute(Weather, WeatherValidator).router); 
        this.express.use( `/api/v1/news`, new NewsRoute(News, NewsValidator).router);
        this.express.use( `/api/v1/books`, new Route(Book, BookValidator).router);
        this.express.use( `/api/v1/products`, new Route(Product, ProductValidator).router);
    }
  
    private registerErrorHandlers() {
        // Handle all API's (not handled by routes)
        this.express.all( '/api/*', unhandledApiRequests );
        // Handle all requets not handled by Routes
        this.express.get( '*', sendReactApplication );
        // Global Error Handler
        this.express.use( errorHandlingMiddleware );
    }

    public listen( port: number ) {
        this.express.listen(port, () => {
            console.log(`Server running at ${port}....`)
        })
    }
}
