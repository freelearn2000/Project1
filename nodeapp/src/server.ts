import express, {Application, Request, Response} from "express";


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
