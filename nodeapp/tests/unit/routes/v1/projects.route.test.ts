import request from "supertest";
import { Server } from '../../../../src/server';
import routerProjects from '../../../../src/routes/v1/projects.route'


let express: any = null;

beforeAll(() => {
    express = new Server().express;
});

afterAll(() => {
    express = null;
});

describe('POST /api/v1/projects', () => {

    test('should respond with 200 status code if name & duration correctly given', async () => {

        const response = await request(express.use(routerProjects)).post('/').send( {name: 'Project1', duration: '6 months'} );

        expect(response.statusCode).toBe(200);
    });

    test('should respond with 400 status code if name & duration missing', async () => {

        const response = await request(express.use(routerProjects)).post('/').send( {duration: '6 months'} );

        expect(response.statusCode).toBe(400);
    });

    test('should specify json as content type in http header', async() => {

        const response = await request(express.use(routerProjects)).post('/').send( {name: 'Project1', duration: '6 months'} );

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('should contain a string in response body for successfully providing name & duration', async () => {

        const response = await request(express.use(routerProjects)).post('/').send( {name: 'Project1', duration: '6 months'} );

        expect(response.body.message).toBeDefined();
    });
});

describe('GET /api/v1/projects', () => {

    test('should respond with 200 status code if name & duration correctly fetched', async () => {

        const response = await request(express.use(routerProjects)).get('/').send();

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if name & duration correctly fetched with id', async () => {

        const response = await request(express.use(routerProjects)).get('/1').send();

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });
});

describe('PATCH /api/v1/projects/:id', () => {

    test('should respond with 404 status code if id not given', async () => {

        const response = await request(express.use(routerProjects)).patch('/').send( {name: 'Project1', duration: '6 months'} );
        
        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if name & duration is updated', async () => {

        const response = await request(express.use(routerProjects)).patch('/1').send( {name: 'Project2', duration: '12 months'} );
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('should respond with 200 status code if duration is updated', async () => {

        const response = await request(express.use(routerProjects)).patch('/1').send( {duration: '20 months'} );
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });
    test('should respond with 200 status code if name is updated', async () => {

        const response = await request(express.use(routerProjects)).patch('/1').send( {name: 'Project3'} );
       
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
    });
});

describe('DELETE /api/v1/projects/:id', () => {

    test('should respond with 404 status code if id not given', async () => {

        const response = await request(express.use(routerProjects)).delete('/').send();

        expect(response.statusCode).toBe(404);
    });

    test('should respond with 200 status code if projects with id:1 is deleted', async () => {

        const response = await request(express.use(routerProjects)).delete('/1').send();
       
        expect(response.statusCode).toBe(200);
    });
});