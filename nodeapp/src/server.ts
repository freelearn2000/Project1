import express from "express";
import { createConnection } from 'typeorm';
import config from './typeorm.config';
import loggingMiddleware from './middlewares/logging.middleware';
import responseMiddleware from './middlewares/response.middleware';
import { unhandledApiRequests, sendReactApplication, errorHandlingMiddleware } from './middlewares/error.middleware';
import { Route } from './routes/v1/index.route';
import { Blog, BlogValidator } from './models/blog.entity';
import { Book, BookValidator } from "./models/book.entity";
import { Project, ProjectValidator } from "./models/project.entity";
import { Product, ProductValidator } from "./models/product.entity";
import { News, NewsValidator } from './models/news.entity';
import { Weather, WeatherValidator } from './models/weather.entity';
import { Service } from './services/index.service';
import { WeatherService } from "./services/weather.service";
import { NewsService } from "./services/news.service";


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
        this.express.use( loggingMiddleware() );
        this.express.use( responseMiddleware() );
    }

    private registerRoutes( ) {
        this.express.use(`/api/v1/blogs`, new Route(BlogValidator, new Service(Blog)).router)
        this.express.use( `/api/v1/projects`, new Route(ProjectValidator, new Service(Project)).router);
        this.express.use( `/api/v1/weather`, new Route(WeatherValidator, new WeatherService(Weather)).router); 
        this.express.use( `/api/v1/news`, new Route(NewsValidator, new NewsService(News)).router);
        this.express.use( `/api/v1/books`, new Route(BookValidator, new Service(Book)).router);
        this.express.use( `/api/v1/products`, new Route(ProductValidator, new Service(Product)).router);
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
