"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_mung_1 = __importDefault(require("express-mung"));
const xml2js_1 = __importDefault(require("xml2js"));
const responseMiddleware = () => {
    return express_mung_1.default.json((body, req, res) => {
        const accept = req.header(`Accept`);
        if (accept === `application/xml`) {
            // Convert to xml
            const builder = new xml2js_1.default.Builder({ rootName: `xml` });
            body = builder.buildObject(body);
        }
        return body;
    });
};
exports.default = responseMiddleware;
