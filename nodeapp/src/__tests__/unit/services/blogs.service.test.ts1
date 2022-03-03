import { Application } from 'express';
import request from "supertest";
import { newDb } from 'pg-mem';
import { Connection } from 'typeorm';
import { Server } from '../../../server';
// import routerBlogs from '../../../../routes/v1/blogs.route';
import { Blog } from '../../../models/blog.entity';


let express: Application = new Server().express;
let connection: Connection;


beforeAll(async() => {
    connection = await newDb().adapters.createTypeormConnection({
        type: 'postgres',
        entities: [Blog],
        synchronize: true
    })
});

afterAll(() => {
    connection.close();
});


describe('blogs service', () => {  

    
});