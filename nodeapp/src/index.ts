import { Server } from './server';


export class Bootstrap {

    public server: Server;;

    constructor( ) {
        this.server = new Server( );
    }

    public launchServer( port: number ) {
        this.server.listen( port );
    }
}

new Bootstrap().launchServer(8080);

