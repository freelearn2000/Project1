"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../shared/config"));
const mycustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'grey'
    }
};
const logConfiguration = {
    levels: mycustomLevels.levels,
    format: winston_1.default.format.combine(winston_1.default.format.simple()),
    // transports: [
    //     new winston.transports.File( {filename: 'error.log', level: 'error'} )
    // ]    
};
const logger = winston_1.default.createLogger(logConfiguration);
winston_1.default.addColors(mycustomLevels.colors);
if (config_1.default.get('NODE_ENV') === 'development') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.simple())
    }));
}
else {
    logger.add(new winston_1.default.transports.File({ filename: 'error.log' }));
}
exports.default = logger;
