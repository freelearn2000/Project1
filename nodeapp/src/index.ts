import 'dotenv/config';
import { Server } from "http";
import { DataSource } from 'typeorm';
import { App } from './app';
import { createDatasource } from './data-source';


export class Bootstrap {

    public async launchApp( ) {
        try {
            console.log(`Initializing application...`);
            const datasource: DataSource =  await createDatasource();
            const server: Server = new App(datasource).listen(Number(process.env.PORT));

        } catch(error) {
            console.log('Cannot launch application! :', error);
        }
    }

    // public async launchServer( ) {
    //     try {

    //         await AppDataSource.initialize( );
    //         console.log(`Database connected.`);

    //         this.server.registerMiddlewares( );
    //         this.server.registerRoutes( );
    //         this.server.registerErrorHandlers( );
    //         console.log(`Registering Routes, Middlewares & Error handlers...`);

    //         this.server.listen(Number(process.env.PORT));

    //         // await this.server.initializeDatabase( );
    //         // this.server.listen(3000);
            
    //     } catch(error) {
    //         console.log('Cannot launch application! :', error)
    //     }
    // }
}

new Bootstrap( ).launchApp( );
