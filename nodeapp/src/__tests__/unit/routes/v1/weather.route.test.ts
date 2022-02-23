import { Application } from 'express';
import request from "supertest";
import { Server } from '../../../../server';
import routerweather from '../../../../routes/v1/weather.route'


let express: Application = null;
let server: Server = null;


beforeAll(() => {
    server = new Server();
    express = server.express;
    server.initializeDatabase();
});

afterAll(() => {
    express = null;
    server = null;
});


describe('/api/v1/weather', () => {

    describe('POST', () => {

        test('should respond with 200 status code if weather & place correctly given', async () => {

            const response = await request(express.use(routerweather)).post('/').send({ place: 'Sydney', weather: 'Rainy' });
    
            expect(response.statusCode).toBe(200);
        });
    
        test('should respond with 400 status code if weather or place missing', async () => {
    
            const response = await request(express.use(routerweather)).post('/').send({ password: '123' });
            expect(response.statusCode).toBe(400);
        });
    
        test('should contain a string in response body for successfully providing weather & place', async () => {
    
            const response = await request(express.use(routerweather)).post('/').send({ place: 'Sydney', weather: 'Rainy' });
            expect(response.body.message).toBeDefined();
        });
    });

    describe('GET', () => {

        test('should respond with 200 status code if weather & place correctly given', async () => {

            const response = await request(express.use(routerweather)).get('/').send();
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    
        test('should respond with 200 status code if weather & place correctly given with id', async () => {
    
            const response = await request(express.use(routerweather)).get('/25').send();
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('PATCH', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express.use(routerweather)).patch('/').send({ place: 'Sydney', weather: 'Rainy' });
            expect(response.statusCode).toBe(404);
        });
    
        test('should respond with 200 status code if weather & place got updated', async () => {
    
            const response = await request(express.use(routerweather)).patch('/25').send({ place: 'Sydney', weather: 'Rainy' });
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    
        test('should respond with 200 status code if weather is updated on given id', async () => {
    
            const response = await request(express.use(routerweather)).patch('/25').send({ weather: 'Rainy' });
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });
        test('should respond with 200 status code if place is updated on given id', async () => {
    
            const response = await request(express.use(routerweather)).patch('/25').send({ place: 'Sydney' });
            
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('DELETE', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express.use(routerweather)).delete('/').send();
    
            expect(response.statusCode).toBe(404);
        });
    
        test('should respond with 200 status code if weather data of given id is deleted', async () => {
    
            const response = await request(express.use(routerweather)).delete('/25').send();
            expect(response.body.message).toBeDefined();
        });
    });
});

