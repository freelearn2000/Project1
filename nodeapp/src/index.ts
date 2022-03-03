import 'dotenv/config';
import { Server } from './server';


export class Bootstrap {

    public server: Server;

    constructor( ) {
        this.server = new Server( );
    }

    public async launchServer( ) {
        try {
            await this.server.initializeDatabase();
            this.server.listen(Number(process.env.PORT));
        } catch(error) {
            console.log('Cannot launch application! :', error)
        }
    }
}

new Bootstrap().launchServer();

