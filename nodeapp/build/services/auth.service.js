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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findResource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const common_1 = require("../shared/common");
const findResource = (model) => __awaiter(void 0, void 0, void 0, function* () {
    let [allResources, error] = yield (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).find(model));
    if (error)
        throw new common_1.ServerError(error.message, `auth.route->findResource`);
    return allResources;
});
exports.findResource = findResource;
