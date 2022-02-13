"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../../services/auth.service");
const common_1 = require("../../shared/common");
const njwt_1 = __importDefault(require("njwt"));
const config_1 = __importDefault(require("../../shared/config"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const user_entity_1 = require("../../models/user.entity");
let router = express_1.default.Router();
// API Endpoint '/users'
router.post(`/`, (0, validation_middleware_1.default)(user_entity_1.AuthUserValidator), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const model = req.body;
    // User is authenticated using OAuth 2.0 (delgated Identity Provider)
    const [users, error] = yield (0, common_1.handleAsync)((0, auth_service_1.findResource)(model));
    if (error)
        return next(error);
    if (users.length) {
        // Create a jwt token & add it to headers
        // Expiry in 2 minutes = 2x60x1000 = 120000
        const payload = users[0].id;
        const claims = { iss: 'auth.google.com', sub: payload };
        const token = njwt_1.default.create(claims, config_1.default.get('jwt:secret'), config_1.default.get('jwt:algorithm'));
        token.setExpiration(new Date().getTime() + config_1.default.get('jwt:expiresIn'));
        users.push({ token: token.compact() });
        res.json(users);
    }
    else {
        next(new common_1.AuthenticationError(null, `auth.route->post`));
    }
}));
exports.default = router;
