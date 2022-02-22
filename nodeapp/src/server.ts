import express, {Request, Response} from "express";
import { createConnection } from 'typeorm';
import config from './typeorm.config';
import routerWeather from './routes/v1/weather.route';
import routerBlogs from './routes/v1/blogs.route';
import routerProjects from './routes/v1/projects.route';
import routerNews from './routes/v1/news.route';
import routerBooks from './routes/v1/books.route';
import routerProducts from './routes/v1/products.route';


export class Server {

    public express: any = null;

    constructor( ) {
        console.log(`Initializing application...`);
        this.express = express( );
        this.registerMiddlewares();
        this.registerRoutes();
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

    public listen( port: number ) {
        this.express.listen(port, () => {
            console.log(`Server running at ${port}....`)
        })
    }
}
