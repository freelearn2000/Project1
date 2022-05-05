import { DataSource } from 'typeorm';


const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [
        __dirname + `/models/*.entity{.ts,.js}`
    ],
    synchronize: true
});


export async function createDatasource( ) {
    try {
        const datasource = await AppDataSource.initialize( );
        console.log(`Database connected.`);
        return datasource;
    } catch (error) {
        console.log(`Database connection failed : `, error);
        throw error;
    }
   
}
