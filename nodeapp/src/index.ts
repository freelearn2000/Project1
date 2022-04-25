import 'dotenv/config';
import { Server } from './server';
import { AppDataSource } from './data-source';


export class Bootstrap {

    public server: Server;

    constructor( ) {
        this.server = new Server( );
    }

    public async launchServer( ) {
        try {

            await AppDataSource.initialize();
            console.log(`Database connected.`);

            this.server.registerMiddlewares();
            this.server.registerRoutes();
            this.server.registerErrorHandlers();
            console.log(`Registering Routes, Middlewares & Error handlers...`);

            this.server.listen(3000);

            // await this.server.initializeDatabase( );
            // this.server.listen(Number(process.env.PORT));
        } catch(error) {
            console.log('Cannot launch application! :', error)
        }
    }
}

new Bootstrap().launchServer();
