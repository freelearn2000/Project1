import request from "supertest";
import { Server } from '../../../../src/server';
import routerNews from '../../../../src/routes/v1/news.route'


let express: any = null;

beforeAll(() => {
    express = new Server().express;
});

afterAll(() => {
    express = null;
});

describe('POST /api/v1/news', () => {

    test('should respond with 200 status code if content & title correctly given', async () => {

        const response = await request(express.use(routerNews)).post('/').send( {title: 'UKnews', content: 'UKnewsContent'} );

        expect(response.statusCode).toBe(200);
    });

    test('should respond with 400 status code if content & title missing', async () => {

        const response = await request(express.use(routerNews)).post('/').send({ content: 'UKnewsContent' });
        expect(response.statusCode).toBe(400);
    });

    test('should contain a string in response body for successfully providing title & content', async () => {

        const response = await request(express.use(routerNews)).post('/').send( {title: 'UKnews', content: 'UKnewsContent'} );
        expect(response.body.message).toBeDefined();
    });
});

describe('GET /api/v1/news', () => {

    test('should respond with 200 status code if weather & place correctly given', async () => {

        const response = await request(express.use(routerNews)).get('/').send();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if title and content correctly given with id', async () => {

        const response = await request(express.use(routerNews)).get('/25').send();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

});

describe('PATCH /api/v1/news/:id', () => {

    test('should respond with 400 status code if id not given', async () => {

        const response = await request(express.use(routerNews)).patch('/').send({ title: 'UKnews', content: 'UKnewsContent' });
        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if title & content of the news with id=2 are updated', async () => {

        const response = await request(express.use(routerNews)).patch('/2').send( {title: 'UKnews', content: 'UKnewsContent'} );
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if title of the news with id=2 is updated', async () => {

        const response = await request(express.use(routerNews)).patch('/2').send({ title: 'UKnews' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });
    test('should respond with 200 status code if content of the news with id=2 is updated', async () => {

        const response = await request(express.use(routerNews)).patch('/2').send({ content: 'UKnewsContent' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

});

describe('DELETE /api/v1/news/:id', () => {

    test('should respond with 400 status code if id not given', async () => {

        const response = await request(express.use(routerNews)).delete('/').send();

        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if news data with id=2 is deleted', async () => {

        const response = await request(express.use(routerNews)).delete('/2').send();
        expect(response.statusCode).toBe(200);
    });

});