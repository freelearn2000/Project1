import { Express } from 'express';
import request from "supertest";
import { newDb, IMemoryDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { App } from '../../../app';
import { Weather } from '../../../models/weather.entity';


let app: App;
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
        entities: [Weather]
    });
    await datasource.synchronize();

    app = new App(datasource).initalize();
    express = app.express;
});

afterAll(() => {
    datasource.destroy();
    app = null;
    express = null;
});

describe('/api/v1/weather', () => {

    describe('POST', () => {

        test('should respond with 200 status code if valid new weather given', async () => {

            const response = await request(express).post('/api/v1/weather').send({ place: 'Sydney', info: 'Rainy' });
    
            console.log(response.body);

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.body.info).toBeDefined();
            expect(response.body.info).toBe('Rainy');
            expect(response.body.place).toBeDefined();
            expect(response.body.place).toBe('Sydney');
        });
    
        test('should respond with 400 status code if invalid new blog given', async () => {
    
            const response = await request(express).post('/api/v1/weather').send({ password: '123' });
            expect(response.statusCode).toBe(400);
        });
    
    });

    describe('GET', () => {

        test('should respond with 200 status code if weather & place correctly fetched', async () => {

            const response = await request(express).get('/api/v1/weather').send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    
        test('should respond with 200 status code if weather & place correctly given with id', async () => {
    
            const response = await request(express).get('/api/v1/weather/1').send();
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });

    describe('PATCH', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express).patch('/api/v1/weather').send({ place: 'Sydney', info: 'Rainy' });
            expect(response.statusCode).toBe(404);
        });
    
        test('should respond with 200 status code if weather & place got updated', async () => {
    
            const response = await request(express).patch('/api/v1/weather/1').send({ place: 'Newyork', info: 'Sunny' });
            expect(response.body.place).toBeDefined();
            expect(response.body.place).toBe('Newyork');
            expect(response.body.info).toBeDefined();
            expect(response.body.info).toBe('Sunny');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    
        test('should respond with 200 status code if weather is updated on given id', async () => {
    
            const response = await request(express).patch('/api/v1/weather/1').send({ info: 'Rainy' });
            expect(response.body.info).toBeDefined();
            expect(response.body.info).toBe('Rainy');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
        test('should respond with 200 status code if place is updated on given id', async () => {
    
            const response = await request(express).patch('/api/v1/weather/1').send({ place: 'Newyork' });
            expect(response.body.place).toBeDefined();
            expect(response.body.place).toBe('Newyork');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });

    describe('DELETE', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express).delete('/api/v1/weather').send();
    
            expect(response.statusCode).toBe(404);
        });
    
        test('should respond with 200 status code if weather data of given id is deleted', async () => {
    
            const response = await request(express).delete('/api/v1/weather/1').send();
            expect(response.statusCode).toBe(200);
        });
    });
});

