import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'priya',
    database: 'project1',
    entities: [
        __dirname + `/models/*.entity{.ts,.js}`
    ],
    synchronize: true
});

// export const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: process.env.DATABASE_HOST,
//     port: Number(process.env.DATABASE_PORT),
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE,
//     entities: [
//         __dirname + `/src/models/*.entity{.ts,.js}`
//     ],
//     synchronize: process.env.NODE_ENV == 'production' ? false : true
// });


// const config: ConnectionOptions = {
//     type: 'postgres',
//     host: process.env.DATABASE_HOST,
//     port: Number(process.env.DATABASE_PORT),
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE,
//     entities: [
//         __dirname + `/src/models/*.entity{.ts,.js}`
//     ],
//     synchronize: process.env.NODE_ENV == 'production' ? false : true
// }

// export default config;
