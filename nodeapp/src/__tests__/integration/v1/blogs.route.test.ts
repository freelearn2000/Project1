import { Express } from 'express';
import request from "supertest";
import { newDb, IMemoryDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { App } from '../../../app';
import { Blog } from '../../../models/blog.entity';


let datasource: DataSource;
let express: Express;
let db: IMemoryDb;

beforeAll(async() => {

    db = newDb({autoCreateForeignKeyIndices: true});
    //==== define current_database
    db.public.registerFunction({
        implementation: () => 'test',
        name: 'current_database',
    });
    datasource = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [Blog]
    });
    await datasource.synchronize();

    express = new App(datasource).express;
});

afterAll(() => {
    datasource.destroy();
    express = null;
});

describe('/api/v1/blogs', () => {

    describe('POST', () => {    

        test('should respond with 200 status code if valid new blog given', async() => {

            const response = await request(express).post('/api/v1/blogs').send({name: 'Bob', content: 'bob_blog...'});

            console.log(response.body);

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('Bob');
            expect(response.body.content).toBeDefined();
            expect(response.body.content).toBe('bob_blog...');
        });

        test('should respond with 400 status code if invalid new blog given', async() => {

            const response = await request(express).post('/api/v1/blogs').send({name2: 'Bob', content: 'bob_blog...'});
            
            expect(response.statusCode).toBe(400);
            // expect(response.body.message).toBe('Data is not valid!');
        });

    });

    describe('GET', () => {

        test('should respond with 200 status code if name & content of blog is correctly fetched', async () => {

            const response = await request(express).get('/api/v1/blogs').send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            
            
        });

        test('should respond with 200 status code if name & content of blog is correctly fetched with id', async () => {

            const response = await request(express).get(`/api/v1/blogs/1`).send();

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            
        });
    });

    describe('PATCH', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express).patch('/api/v1/blogs').send( {name: 'Bob', content: 'bob_blog'} );

            expect(response.statusCode).toBe(404);

        });

        test('should respond with 200 status code if name & content updated', async () => {

            const response = await request(express).patch('/api/v1/blogs/1').send( {name: 'Jim', content: 'Jim_blog'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('Jim');
            expect(response.body.content).toBeDefined();
            expect(response.body.content).toBe('Jim_blog');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should respond with 200 status code if name is updated', async () => {

            const response = await request(express).patch('/api/v1/blogs/1').send( {name: 'John'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('John');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should respond with 200 status code if content is updated', async () => {

            const response = await request(express).patch('/api/v1/blogs/1').send( {content: 'John_blog'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.content).toBeDefined();
            expect(response.body.content).toBe('John_blog');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });

    describe('DELETE', () => {

        test('should respond with 404 status code if invalid id for blog is not given', async () => {

            const response = await request(express).delete('/api/v1/blogs').send();

            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if blog with id:1 is deleted', async () => {

            const response = await request(express).delete('/api/v1/blogs/1').send();

            console.log(response.body);

            expect(response.statusCode).toBe(200);
        });
    });
});