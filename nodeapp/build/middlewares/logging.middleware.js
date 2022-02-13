"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../shared/logger"));
const loggingMiddleware = () => {
    return (req, res, next) => {
        logger_1.default.info(`Request : ${req.method} ${req.path}`);
        next();
    };
};
exports.default = loggingMiddleware;
