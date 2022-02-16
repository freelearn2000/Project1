import express, {Request, Response} from "express";
import routerWeather from './routes/v1/weather.route';
import routerBlogs from './routes/v1/blogs.route';
import routerProjects from './routes/v1/projects.route';



export class Server {

    public express: any = null;

    constructor( ) {
        this.express = express( );
        this.addMiddleware();
        this.addRoutes();
    }

    private addMiddleware( ) {
        this.express.use( express.json() );
    }

    private addRoutes( ) {
        
        this.express.use(`/api/v1/blogs`, routerBlogs)
        this.express.use( `/api/v1/projects`, routerProjects);
        this.express.use( `/api/v1/weather`, routerWeather); 
        this.express.post('/api/users', (request: Request, response: Response) => {

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
    }

    public listen( port: number ) {
        this.express.listen(port, () => {
            console.log(`Server running at ${port}....`)
        })
    }
}
