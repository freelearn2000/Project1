import { Application } from 'express';
import request from "supertest";
import { newDb } from 'pg-mem';
import { Connection } from 'typeorm';
import { Server } from '../../../../server';
import { Project } from '../../../../models/project.entity';


let express: Application = new Server().express;
let connection: Connection;


beforeAll(async() => {
    connection = await newDb().adapters.createTypeormConnection({
        type: 'postgres',
        entities: [Project],
        synchronize: true
    })
});

afterAll(() => {
    connection.close();
});


describe('/api/v1/projects', () => {

    describe('POST', () => {    

        test('should respond with 200 status code if valid new project given', async() => {

            const response = await request(express).post('/api/v1/projects').send({name: 'Project1', duration: '6 months'});

            console.log(response.body);

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('Project1');
            expect(response.body.duration).toBeDefined();
            expect(response.body.duration).toBe('6 months');
        });

        test('should respond with 400 status code if invalid new project given', async() => {

            const response = await request(express).post('/api/v1/projects').send({name2: 'Project1', duration: '6 months'});
            
            expect(response.statusCode).toBe(400);
            // expect(response.body.message).toBe('Data is not valid!');
        });

    });

    describe('GET', () => {

        test('should respond with 200 status code if name & content of project is correctly fetched', async () => {

            const response = await request(express).get('/api/v1/projects').send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            
            
        });

        test('should respond with 200 status code if name & content of project is correctly fetched with id', async () => {

            const response = await request(express).get(`/api/v1/projects/1`).send();

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            
        });
    });

    describe('PATCH', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express).patch('/api/v1/projects').send( {name: 'Project1', duration: '6 months'} );

            expect(response.statusCode).toBe(404);

        });

        test('should respond with 200 status code if name & content updated', async () => {

            const response = await request(express).patch('/api/v1/projects/1').send( {name: 'Project2', duration: '12 months'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('Project2');
            expect(response.body.duration).toBeDefined();
            expect(response.body.duration).toBe('12 months');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should respond with 200 status code if name is updated', async () => {

            const response = await request(express).patch('/api/v1/projects/1').send( {name: 'Project3'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('Project3');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should respond with 200 status code if content is updated', async () => {

            const response = await request(express).patch('/api/v1/projects/1').send( {duration: '18 months'} );

            expect(response.statusCode).toBe(200);
            expect(response.body.duration).toBeDefined();
            expect(response.body.duration).toBe('18 months');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });

    describe('DELETE', () => {

        test('should respond with 404 status code if invalid id for project is not given', async () => {

            const response = await request(express).delete('/api/v1/projects').send();

            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if project with id:1 is deleted', async () => {

            const response = await request(express).delete('/api/v1/projects/1').send();

            console.log(response.body);

            expect(response.statusCode).toBe(200);
        });
    });
});


