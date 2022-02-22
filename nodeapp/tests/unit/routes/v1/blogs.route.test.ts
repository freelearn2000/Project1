import { Application } from 'express';
import request from "supertest";
import { Server } from '../../../../src/server';
import routerBlogs from '../../../../src/routes/v1/blogs.route';


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


describe('/api/v1/blogs', () => {

    describe('POST', () => {    

        test('should respond with 200 status code if name & content correctly given', async() => {

            const response = await request(express.use(routerBlogs)).post('/').send( {name: 'Bob', content: 'bob_blog'} );

            expect(response.statusCode).toBe(200);
        });

        // test('should respond with 400 status code if name & content missing', async() => {

        //     const response = await request(express.use(routerBlogs)).post('/').send( {content: 'bob_blog'} );

        //     expect(response.statusCode).toBe(400);
        // });

        // test('should specify json as content type in http header', async() => {

        //     const response = await request(express.use(routerBlogs)).post('/').send( {name: 'Bob', content: 'bob_blog'} );

        //     expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        // });

        // test('should contain string in response body for successfully created name & content', async() => {

        //     const response = await request(express.use(routerBlogs)).post('/').send( {name: 'Bob', content: 'bob_blog'} );

        //     expect(response.body.message).toBeDefined();
        // });
    });

//     describe('GET', () => {

//         test('should respond with 200 status code if name & content correctly fetched', async () => {

//             const response = await request(express.use(routerBlogs)).get('/').send();

//             expect(response.statusCode).toBe(200);
//             expect(response.body.message).toBeDefined();
//         });

//         test('should respond with 200 status code if name & content correctly fetched with id', async () => {

//             const response = await request(express.use(routerBlogs)).get('/2').send();

//             expect(response.statusCode).toBe(200);
//             expect(response.body.message).toBeDefined();
//         });
//     });

//     describe('PATCH', () => {

//         test('should respond with 404 status code if id not given', async () => {

//             const response = await request(express.use(routerBlogs)).patch('/').send( {name: 'Bob', content: 'bob_blog'} );

//             expect(response.statusCode).toBe(404);
//         });

//         test('should respond with 200 status code if name & content updated', async () => {

//             const response = await request(express.use(routerBlogs)).patch('/2').send( {name: 'Jim', content: 'Jim_blog'} );

//             expect(response.statusCode).toBe(200);
//             expect(response.body.message).toBeDefined();
//         });

//         test('should respond with 200 status code if name is updated', async () => {

//             const response = await request(express.use(routerBlogs)).patch('/2').send( {name: 'John'} );

//             expect(response.statusCode).toBe(200);
//             expect(response.body.message).toBeDefined();
//         });

//         test('should respond with 200 status code if content is updated', async () => {

//             const response = await request(express.use(routerBlogs)).patch('/2').send( {content: 'John_blog'} );

//             expect(response.statusCode).toBe(200);
//             expect(response.body.message).toBeDefined();
//         });
//     });

//     describe('DELETE', () => {

//         test('should respond with 404 status code if id not given', async () => {

//             const response = await request(express.use(routerBlogs)).delete('/').send();

//             expect(response.statusCode).toBe(404);
//         });

//         test('should respond with 200 status code if blog with id:2 is deleted', async () => {

//             const response = await request(express.use(routerBlogs)).delete('/2').send();

//             expect(response.statusCode).toBe(200);
//         });
//     });
});


