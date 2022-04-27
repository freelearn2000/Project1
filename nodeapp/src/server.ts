import express from "express";
import { AppDataSource } from './data-source';
import loggingMiddleware from './middlewares/logging.middleware';
import responseMiddleware from './middlewares/response.middleware';
import { unhandledApiRequests, errorHandlingMiddleware } from './middlewares/error.middleware';
import { Route } from './routes/v1/index.route';
import { AuthV1Route } from "./routes/v1/auth.route";
import { AuthV2Route } from "./routes/v2/auth.route";
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


export class Server {

    public express: any = null;

    constructor( ) {
        console.log(`Initializing application...`);
        this.express = express( );
        // this.registerMiddlewares( );
        // this.registerRoutes( );
        // this.registerErrorHandlers( );
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

    public registerMiddlewares( ) {
        this.express.use( express.json( ) );
        this.express.use( loggingMiddleware( ) );
        this.express.use( responseMiddleware( ) );
    }
    
    public registerRoutes( ) {
        this.express.use( `/api/v1/blogs`, new Route(BlogValidator, new Service(AppDataSource.getRepository(Blog))).router);
        this.express.use( `/api/v1/projects`, new Route(ProjectValidator, new Service(AppDataSource.getRepository(Project))).router);
        this.express.use( `/api/v1/weather`, new Route(WeatherValidator, new WeatherService(AppDataSource.getRepository(Weather))).router); 
        this.express.use( `/api/v1/news`, new Route(NewsValidator, new NewsService(AppDataSource.getRepository(News))).router);
        this.express.use( `/api/v1/books`, new Route(BookValidator, new Service(AppDataSource.getRepository(Book))).router);
        this.express.use( `/api/v1/products`, new Route(ProductValidator, new Service(AppDataSource.getRepository(Product))).router);
        this.express.use( `/api/v1/users`, new Route(UserValidator, new Service(AppDataSource.getRepository(User))).router);
        this.express.use( `/api/v1/auth`, new AuthV1Route(AuthUserValidator, new Service(AppDataSource.getRepository(User))).router);
        this.express.use( `/api/v2/auth`, new AuthV2Route(AuthUserValidator, new Service(AppDataSource.getRepository(User))).router);
    }
    
    public registerErrorHandlers( ) {
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
