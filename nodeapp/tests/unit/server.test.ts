import request from "supertest";
import { Server } from '../../src/server';


let express: any = null;

beforeAll(() => {
    express = new Server().express;
});

afterAll(() => {
   express = null;
});

describe('POST /api/users', () => {

    test('should respond with 200 status code if username & password correctly given', async() => {

        const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});

        expect(response.statusCode).toBe(200);
    });

    test('should respond with 400 status code if username & password missing', async() => {

        const response = await request(express).post('/api/users').send({password: '123'});

        expect(response.statusCode).toBe(400);
    });

    test('should specify json as content type in http header', async() => {

        const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('should contain userId in response body for successfully providing username & password', async() => {

        const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});

        expect(response.body.userId).toBeDefined();
    });
});
