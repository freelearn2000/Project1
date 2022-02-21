import request from "supertest";
import { Server } from '../../../../src/server';
import routerBooks from '../../../../src/routes/v1/books.route';


let express: any = null;

beforeAll(() => {
    express = new Server().express;
});

afterAll(() => {
    express = null;
});


describe('/api/v1/books', () => {

    describe('POST', () => {

        test('should respond with 200 status code if name & price correctly given', async () => {

            const response = await request(express.use(routerBooks)).post('/').send({ name: 'The Diary Of a Young Girl', price: '666' });

            expect(response.statusCode).toBe(200);
        });

        test('should respond with 400 status code if name & price missing', async () => {

            const response = await request(express.use(routerBooks)).post('/').send({ price: '888' });

            expect(response.statusCode).toBe(400);
        });

        test('should specify json as content type in http header', async () => {

            const response = await request(express.use(routerBooks)).post('/').send({ name: 'The Aspirant', price: '777' });

            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should contain string in response body for successfully created name & price', async () => {

            const response = await request(express.use(routerBooks)).post('/').send({ name: 'Daivathinte Charanmar', price: '555' });

            expect(response.body.message).toBeDefined();
        });
    });

    describe('GET', () => {

        test('should respond with 200 status code if name & price correctly fetched', async () => {

            const response = await request(express.use(routerBooks)).get('/').send();

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });

        test('should respond with 200 status code if name & price correctly fetched with id', async () => {

            const response = await request(express.use(routerBooks)).get('/2').send();

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('PATCH', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express.use(routerBooks)).patch('/').send({ name: 'The world as I see it', price: '799' });

            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if name & price updated', async () => {

            const response = await request(express.use(routerBooks)).patch('/2').send({ name: 'Fear not be strong', price: '899' });

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });

        test('should respond with 200 status code if name is updated', async () => {

            const response = await request(express.use(routerBooks)).patch('/2').send({ name: 'Wings of Fire' });

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });

        test('should respond with 200 status code if price is updated', async () => {

            const response = await request(express.use(routerBooks)).patch('/2').send({ price: '1500' });

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('DELETE', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express.use(routerBooks)).delete('/').send();

            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if book with id:5 is deleted', async () => {

            const response = await request(express.use(routerBooks)).delete('/5').send();

            expect(response.statusCode).toBe(200);
        });
    });
    // to

});
