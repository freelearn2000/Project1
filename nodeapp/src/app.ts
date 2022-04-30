import express, { Express } from "express";
import { DataSource } from 'typeorm';
// import { AppDataSource } from './data-source';
import loggingMiddleware from './middlewares/logging.middleware';
import responseMiddleware from './middlewares/response.middleware';
import { unhandledApiRequests, errorHandlingMiddleware } from './middlewares/error.middleware';
import { Route } from './routes/v1/index.route';
import { AuthRoute1 } from "./routes/v1/auth.route";
import { AuthRoute2 } from "./routes/v2/auth.route";
import { Blog, BlogValidator } from './models/blog.entity';
import { Book, BookValidator } from "./models/book.entity";
import { Project, ProjectValidator } from "./models/project.entity";
import { Product, ProductValidator } from "./models/product.entity";
import { News, NewsValidator } from './models/news.entity';
import { Weather, WeatherValidator } from './models/weather.entity';
import { Service } from './services/index.service';
import { WeatherService } from "./services/weather.service";
import { NewsService } from "./services/news.service";
import { User, UserValidator, AuthUserValidator } from './models/user.entity';


export class App {

    public express: Express;
    private datasource: DataSource;

    constructor( datasource: DataSource ) {
        this.express = express( );
        this.datasource = datasource;
    }

    public initalize( ): App {
        this.registerMiddlewares( );
        this.registerRoutes( );
        this.registerErrorHandlers( );
        console.log(`Registering Routes, Middlewares & Error handlers...`);
        return this;
    }

    // public async initializeDatabase( ) {
    //     try {
    //         await new DataSource(config);
    //         console.log(`Database connected!`);
    //     } catch( error ) {
    //         console.log(`Database connection failed : `, error);
    //         throw error;
    //     }
    // }

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

        // this.express.use( `/api/v1/blogs`, new Route(BlogValidator, new Service(this.datasource.getRepository(Blog))).router);
        // this.express.use( `/api/v1/projects`, new Route(ProjectValidator, new Service(this.datasource.getRepository(Project))).router);
        // this.express.use( `/api/v1/weather`, new Route(WeatherValidator, new WeatherService(this.datasource.getRepository(Weather))).router); 
        // this.express.use( `/api/v1/news`, new Route(NewsValidator, new NewsService(this.datasource.getRepository(News))).router);
        // this.express.use( `/api/v1/books`, new Route(BookValidator, new Service(this.datasource.getRepository(Book))).router);
        // this.express.use( `/api/v1/products`, new Route(ProductValidator, new Service(this.datasource.getRepository(Product))).router);
        // this.express.use( `/api/v1/users`, new Route(UserValidator, new Service(this.datasource.getRepository(User))).router);
        // this.express.use( `/api/v1/auth`, new AuthV1Route(AuthUserValidator, new Service(this.datasource.getRepository(User))).router);
        // this.express.use( `/api/v2/auth`, new AuthV2Route(AuthUserValidator, new Service(this.datasource.getRepository(User))).router);
    }
    
    private registerErrorHandlers( ) {
        // Handle all API's (not handled by routes)
        this.express.all( '/api/*', unhandledApiRequests );
        // Handle all requests not handled by Routes
        this.express.all( '*', express.static(`${process.env.REACT_PATH}`) );
        // Global Error Handler
        this.express.use( errorHandlingMiddleware );
    }

    public listen( port: number ) {
        this.express.listen(port, ( ) => {
            console.log( `Server successfully running at ${port}....` )
        })
    }
}
