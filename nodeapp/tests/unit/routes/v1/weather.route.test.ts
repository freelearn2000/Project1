import request from "supertest";
import { Server } from '../../../../src/server';
import routerweather from '../../../../src/routes/v1/weather.route'


let express: any = null;

beforeAll(() => {
    express = new Server().express;
});

afterAll(() => {
    express = null;
});

describe('POST /api/v1/users', () => {

    test('should respond with 200 status code if weather & place correctly given', async () => {

        const response = await request(express.use(routerweather)).post('/').send({ place: 'Sydney', weather: 'Rainy' });

        expect(response.statusCode).toBe(200);
    });

    test('should respond with 400 status code if weather & place missing', async () => {

        const response = await request(express.use(routerweather)).post('/').send({ password: '123' });
        expect(response.statusCode).toBe(400);
    });

    test('should contain a string in response body for successfully providing weather & place', async () => {

        const response = await request(express.use(routerweather)).post('/').send({ place: 'Sydney', weather: 'Rainy' });
        expect(response.body.message).toBeDefined();
    });
});

describe('GET /api/v1/users', () => {

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

describe('PATCH /api/v1/users/:id', () => {

    test('should respond with 400 status code if id not given', async () => {

        const response = await request(express.use(routerweather)).patch('/').send({ place: 'Sydney', weather: 'Rainy' });
        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if weather & place updated', async () => {

        const response = await request(express.use(routerweather)).patch('/25').send({ place: 'Sydney', weather: 'Rainy' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if weather is updated', async () => {

        const response = await request(express.use(routerweather)).patch('/25').send({ weather: 'Rainy' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });
    test('should respond with 200 status code if place is updated', async () => {

        const response = await request(express.use(routerweather)).patch('/25').send({ place: 'Sydney' });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

});

describe('DELETE /api/v1/users/:id', () => {

    test('should respond with 400 status code if id not given', async () => {

        const response = await request(express.use(routerweather)).delete('/').send();

        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if weather data is deleted', async () => {

        const response = await request(express.use(routerweather)).delete('/25').send();
        expect(response.body.message).toBeDefined();
    });

});