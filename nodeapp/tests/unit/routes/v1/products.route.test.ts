import request from "supertest";
import { Server } from '../../../../src/server';
import routerProducts from '../../../../src/routes/v1/products.route';


let express: any = null;

beforeAll(() => {
    express = new Server().express;
});

afterAll(() => {
    express = null;
});

describe('POST /api/v1/products', () => {

    test('should respond with 200 status code if name & price correctly given', async() => {

        const response = await request(express.use(routerProducts)).post('/').send( {name: 'product1', price: 100} );

        expect(response.statusCode).toBe(200);
    });

    test('should respond with 400 status code if name or price missing', async() => {

        const response = await request(express.use(routerProducts)).post('/').send( {price: 100} );

        expect(response.statusCode).toBe(400);
    });

    test('should specify json as price type in http header', async() => {

        const response = await request(express.use(routerProducts)).post('/').send( {name: 'product1', price: 100} );

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('should contain string in response body for successfully created name & price', async() => {

        const response = await request(express.use(routerProducts)).post('/').send( {name: 'product1', price: 100} );

        expect(response.body.message).toBeDefined();
    });
});

describe('GET /api/v1/products', () => {

    test('should respond with 200 status code if name & price correctly fetched', async () => {

        const response = await request(express.use(routerProducts)).get('/').send();

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if name & price correctly fetched with id', async () => {

        const response = await request(express.use(routerProducts)).get('/2').send();

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });
});

describe('PATCH /api/v1/products/:id', () => {

    test('should respond with 404 status code if id not given', async () => {

        const response = await request(express.use(routerProducts)).patch('/').send( {name: 'product1', price: 100} );

        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if name & price updated', async () => {

        const response = await request(express.use(routerProducts)).patch('/2').send( {name: 'product2', price: 500} );

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if name is updated', async () => {

        const response = await request(express.use(routerProducts)).patch('/2').send( {name: 'product2'} );

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if price is updated', async () => {

        const response = await request(express.use(routerProducts)).patch('/2').send( {price: 500} );

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });
});

describe('DELETE /api/v1/products/:id', () => {

    test('should respond with 404 status code if id not given', async () => {

        const response = await request(express.use(routerProducts)).delete('/').send();

        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if product with id:2 is deleted', async () => {

        const response = await request(express.use(routerProducts)).delete('/2').send();

        expect(response.statusCode).toBe(201);
    });
});


