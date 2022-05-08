import { Express } from 'express';
import request from "supertest";
import { newDb, IMemoryDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { App } from '../../../app';
import { Product } from '../../../models/product.entity';


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
        entities: [Product]
    });
    await datasource.synchronize();

    express = new App(datasource).express;
});

afterAll(() => {
    datasource.destroy();
    express = null;
});

describe('/api/v1/products', () => {

    describe('POST', () => {    

        test('should respond with 200 status code if valid new product given', async() => {

            const response = await request(express).post('/api/v1/products').send({name: 'product1', price: 100});

            console.log(response.body);

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('product1');
            expect(response.body.price).toBeDefined();
            expect(response.body.price).toBe(100);
        });

        test('should respond with 400 status code if invalid new product given', async() => {

            const response = await request(express).post('/api/v1/products').send({name2: 'product1', price: 100});
            
            expect(response.statusCode).toBe(400);
            // expect(response.body.message).toBe('Data is not valid!');
        });

    });

    describe('GET', () => {

        test('should respond with 200 status code if name & price of product is correctly fetched', async () => {

            const response = await request(express).get('/api/v1/products').send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            
            
        });

        test('should respond with 200 status code if name & price of product is correctly fetched with id', async () => {

            const response = await request(express).get(`/api/v1/products/1`).send();

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            
        });
    });

    describe('PATCH', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express).patch('/api/v1/products').send( {name: 'product1', price: 100} );

            expect(response.statusCode).toBe(404);

        });

        test('should respond with 200 status code if name & price updated', async () => {

            const response = await request(express).patch('/api/v1/products/1').send( {name: 'product2', price: 200} );

            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('product2');
            expect(response.body.price).toBeDefined();
            expect(response.body.price).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should respond with 200 status code if name is updated', async () => {

            const response = await request(express).patch('/api/v1/products/1').send( {name: 'product2'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('product2');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should respond with 200 status code if price is updated', async () => {

            const response = await request(express).patch('/api/v1/products/1').send( {price: 200} );

            expect(response.statusCode).toBe(200);
            expect(response.body.price).toBeDefined();
            expect(response.body.price).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });

    describe('DELETE', () => {

        test('should respond with 404 status code if invalid id for product is not given', async () => {

            const response = await request(express).delete('/api/v1/products').send();

            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if product with id:1 is deleted', async () => {

            const response = await request(express).delete('/api/v1/products/1').send();

            console.log(response.body);

            expect(response.statusCode).toBe(200);
        });
    });
});


