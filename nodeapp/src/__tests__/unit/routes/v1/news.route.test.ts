import { Application } from 'express';
import request from "supertest";
import { newDb } from 'pg-mem';
import { Connection } from 'typeorm';
import { Server } from '../../../../server';
import { News } from '../../../../models/news.entity';


let express: Application = new Server().express;
let connection: Connection;


beforeAll(async() => {
    connection = await newDb().adapters.createTypeormConnection({
        type: 'postgres',
        entities: [News],
        synchronize: true
    })
});

afterAll(() => {
    connection.close();
});


describe('/api/v1/news', ( ) => {

    describe('POST', ( ) => {    

        test('should respond with 200 status code if valid news given', async() => {

            const response = await request(express).post('/api/v1/news').send( {title: 'UKnews', content: 'UKnewsContent'} );

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual( expect.stringContaining('json'));
            expect(response.body.title ).toBeDefined();
            expect(response.body.title).toBe('UKnews');
            expect(response.body.content).toBeDefined();
            expect(response.body.content).toBe('UKnewsContent');
        });

        test('should respond with 400 status code if invalid news given', async() => {

            const response = await request(express).post('/api/v1/news').send( {title1: 'UKnews',content: 'UKnewsContent'} );

            expect(response.statusCode).toBe(400);
            // expect(response.body.message).toBe('Data is not valid!');
        });
        test('should respond with 400 status code if title is missing', async () => {

            const response = await request(express).post('/api/v1/news').send({ content: 'UKnewsContent' });

            expect(response.statusCode).toBe(400);
        });
    });    

        

    describe('GET', ( ) => {

        test('should respond with 200 status code if title & content correctly fetched', async ( ) => {

            const response = await request(express).get('/api/v1/news').send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        });

        test('should respond with 200 status code if title and content correctly fetched with id = 1', async ( ) => {

            const response = await request(express).get('/api/v1/news/1').send();
            expect(response.statusCode).toBe(200);
         });
    });

    describe('PATCH', ( ) => {

        test('should respond with 404 status code if id not given', async ( ) => {

            const response = await request(express).patch('/api/v1/news').send( {title: 'USnews',content: 'USnewsContent'} );
            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if title & content of the news with id = 1 are updated', async ( ) => {

            const response = await request(express).patch('/api/v1/news/1').send( {title: 'USnews',content: 'USnewsContent'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe('USnews');
            expect(response.body.content).toBeDefined();
            expect(response.body.content).toBe('USnewsContent');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    

        test('should respond with 200 status code if title of the news with id = 1 is updated', async ( ) => {

            const response = await request(express).patch('/api/v1/news/1').send( {title: 'USnews'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBeDefined();
            expect(response.body.title).toBe('USnews');
        });
        
        test('should respond with 200 status code if content of the news with id = 1 is updated', async ( ) => {

            const response = await request(express).patch('/api/v1/news/1').send( {content: 'USnewsContent'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.content).toBeDefined();
            expect(response.body.content).toBe('USnewsContent');
        });

    });

    describe('DELETE', ( ) => {

        test('should respond with 404 status code if id not given', async ( ) => {

            const response = await request(express).delete('/api/v1/news').send();

            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if news data with id = 1 is deleted', async ( ) => {

            const response = await request(express).delete('/api/v1/news/1').send();

            expect(response.statusCode).toBe(200);
        });
    });
});