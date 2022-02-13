"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const nconf_1 = __importDefault(require("nconf"));
const path_1 = __importDefault(require("path"));
// Read .env file & populate Environment variables
dotenv_1.default.config();
nconf_1.default.argv().env();
switch (process.env.NODE_ENV) {
    case `production`:
        nconf_1.default.file(`prod`, path_1.default.resolve(__dirname, `../../config/production.json`));
        break;
    case `staging`:
        nconf_1.default.file(`prod`, path_1.default.resolve(__dirname, `../../config/staging.json`));
        break;
    default:
        nconf_1.default.file(`prod`, path_1.default.resolve(__dirname, `../../config/default.json`));
}
exports.default = nconf_1.default;
