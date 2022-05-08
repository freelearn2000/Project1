import express, { Express } from "express";
import { Server } from "http";
import { DataSource } from 'typeorm';
import loggingMiddleware from './middlewares/logging.middleware';
import responseMiddleware from './middlewares/response.middleware';
import { unhandledApiRequests, errorHandlingMiddleware } from './middlewares/error.middleware';
import { Route } from './routes/v1/index.route';
import { AuthRoute as AuthRoute1} from "./routes/v1/auth.route";
import { AuthRoute as AuthRoute2} from "./routes/v2/auth.route";
import { Blog, BlogValidator } from './models/blog.entity';
import { Book, BookValidator } from "./models/book.entity";
import { Project, ProjectValidator } from "./models/project.entity";
import { Product, ProductValidator } from "./models/product.entity";
import { News, NewsValidator } from './models/news.entity';
import { Weather, WeatherValidator } from './models/weather.entity';
import { Service } from './services/v1/index.service';
import { WeatherService } from "./services/v1/weather.service";
import { NewsService } from "./services/v1/news.service";
import { User, UserValidator, AuthUserValidator } from './models/user.entity';


export class App {

    public express: Express;
    private datasource: DataSource;

    constructor( datasource: DataSource ) {
        this.express = express( );
        this.datasource = datasource;

        this.registerMiddlewares( );
        this.registerRoutes( );
        this.registerErrorHandlers( );
        console.log(`Registering Routes, Middlewares & Error handlers...`);
    }
  
    private registerMiddlewares( ) {
        this.express.use( express.json( ) );
        this.express.use( loggingMiddleware( ) );
        this.express.use( responseMiddleware( ) );
    }
    
    private registerRoutes( ) {
        this.express.use( `/api/v1/blogs`, new Route(BlogValidator, new Service(Blog, this.datasource)).router);
        this.express.use( `/api/v1/projects`, new Route(ProjectValidator, new Service(Project, this.datasource)).router);
        this.express.use( `/api/v1/weather`, new Route(WeatherValidator, new WeatherService(Weather, this.datasource)).router); 
        this.express.use( `/api/v1/news`, new Route(NewsValidator, new NewsService(News, this.datasource)).router);
        this.express.use( `/api/v1/books`, new Route(BookValidator, new Service(Book, this.datasource)).router);
        this.express.use( `/api/v1/products`, new Route(ProductValidator, new Service(Product, this.datasource)).router);
        this.express.use( `/api/v1/users`, new Route(UserValidator, new Service(User, this.datasource)).router);
        this.express.use( `/api/v1/auth`, new AuthRoute1(AuthUserValidator, new Service(User, this.datasource)).router);
        this.express.use( `/api/v2/auth`, new AuthRoute2(AuthUserValidator, new Service(User, this.datasource)).router);
    }
    
    private registerErrorHandlers( ) {
        // Handle all API's (not handled by routes)
        this.express.all( '/api/*', unhandledApiRequests );
        // Handle all requests not handled by Routes
        this.express.all( '*', express.static(`${process.env.REACT_PATH}`) );
        // Global Error Handler
        this.express.use( errorHandlingMiddleware );
    }

    public listen( port: number ): Server {
        return this.express.listen(port, ( ) => {
            console.log( `Server successfully running at ${port}....` )
        })
    }
}
