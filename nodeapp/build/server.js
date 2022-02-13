"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load configuration informations first!
const config_1 = __importDefault(require("./shared/config"));
const logger_1 = __importDefault(require("./shared/logger"));
const express_1 = __importDefault(require("express"));
// import path from 'path';
const users_route_1 = __importDefault(require("./routes/v1/users.route"));
const auth_route_1 = __importDefault(require("./routes/v1/auth.route"));
const auth_route_2 = __importDefault(require("./routes/v2/auth.route"));
// import { createConnection } from 'typeorm';
// import config from './typeormconfig';
const response_middleware_1 = __importDefault(require("./middlewares/response.middleware"));
const logging_middleware_1 = __importDefault(require("./middlewares/logging.middleware"));
const common_1 = require("./shared/common");
const common_2 = require("./shared/common");
const API_PREFIX_V1 = `/api/v1`;
const API_PREFIX_V2 = `/api/v2`;
const PORT = process.env.PORT || 3000;
const server = (0, express_1.default)();
server.use(express_1.default.json());
logger_1.default.info(`Environment : ${config_1.default.get('NODE_ENV')}`);
// Connect Adaptor to Persistance Layer (PostGres)
// async/await (2015 - ES6)
// Promise (2015 - ES6)
// Using Promise
// createConnection( config )
//     .then( ( ) => logger.info(`Adaptor connected...`) )
//     .catch( (error) => logger.error(`Adaptor failed to connect : `, error) );
// Using async/await
// async function connectToPostGres( ) {
//     try {
//         await createConnection(config);
//         console.log(`Connection successful!`);
//     } catch( error ) {
//         console.log(`Connection failed : `, error);
//     }
// }
// connectToPostGres( );
// Logging middleware
server.use((0, logging_middleware_1.default)());
// Response Formatter
server.use((0, response_middleware_1.default)());
// Add Routes
server.use(`${API_PREFIX_V1}/auth`, auth_route_1.default);
server.use(`${API_PREFIX_V2}/auth`, auth_route_2.default);
server.use(`${API_PREFIX_V1}/users`, users_route_1.default);
// Handle all API's (not handled by routes)
server.all('/api/*', (req, res) => {
    throw new common_2.ApiNotImplementedError(`API ${req.method} on ${req.path} not implemented!`, `Main-Bad api request`);
});
// Welcome message
server.get(`*`, (req, res) => {
    res.status(200).send({ message: `Welcome to Our Application!` });
});
// Handle GET requests not handled by Routes, send React Application to Client
// server.get( '*', (req, res) => {
//     res.sendFile( path.resolve(__dirname, '../../node-project-2/src/client/index.html') );
// });
// Handle All other (POST, PATCH, DELETE) requets not handled by Routes
server.all('*', (req, res) => {
    throw new common_1.NotImplementedError(`Not implemented`, `Main-Bad request`);
});
// Global error handler
server.use((error, req, res, next) => {
    // res.send( {status: error.status, message: `Error occured!`} );
    res.status(error.status).send({ message: error.message });
    // Further log the Error Message & Origin to persistance layer (analytics)
    logger_1.default.error(`Status: ${error.status}, Origin: ${error.origin}, Error: ${error.message}`);
});
server.listen(PORT, () => {
    logger_1.default.info(`Server running at ${PORT}....`);
});
