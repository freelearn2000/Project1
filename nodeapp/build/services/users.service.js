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
exports.deleteResource = exports.patchResource = exports.findOneResource = exports.findResource = exports.createResource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const common_1 = require("../shared/common");
const createResource = (model) => __awaiter(void 0, void 0, void 0, function* () {
    const tempObject = (0, typeorm_1.getRepository)(user_entity_1.User).create(model);
    let [newResource, error] = yield (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).save(tempObject));
    if (error)
        throw new common_1.ServerError(error.message, `users.route -> createResource`);
    return newResource;
});
exports.createResource = createResource;
const findResource = (options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let allResources = null;
    let error = null;
    const filter = (0, common_1.fieldFilter)(options);
    const page = (0, common_1.paging)(options);
    // 3. Search (Case-Insensitive search based on default field 'name')
    let where = (_a = options.q) !== null && _a !== void 0 ? _a : ``;
    // 4. Sorting (based on fields; default sort is by id)
    // format : order=name
    let order = options.order ? `entity.${options.order}` : `entity.id`;
    // Partial selection
    [allResources, error] = yield (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User)
        .createQueryBuilder(`entity`)
        .select(filter)
        .where(`LOWER(entity.name) like LOWER(:name)`, { name: `%${where.toLowerCase()}%` })
        .skip(page.offset)
        .take(page.limit)
        .orderBy(order, `ASC`)
        .getMany());
    if (error)
        throw new common_1.ServerError(error.message, `news.route -> findResource`);
    return allResources;
});
exports.findResource = findResource;
const findOneResource = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, common_1.fieldFilter)(options);
    let [resource, error] = yield (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User)
        .createQueryBuilder(`entity`)
        .select(filter)
        .where({ id })
        .getOne());
    if (error)
        throw new common_1.ServerError(error.message, `news.route -> findoneResource`);
    return resource;
});
exports.findOneResource = findOneResource;
const patchResource = (id, patchedModel) => __awaiter(void 0, void 0, void 0, function* () {
    let [, error] = yield (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).update(id, patchedModel));
    if (error)
        throw new common_1.ServerError(error.message, `users.route -> patchResource`);
    let [resource, error2] = yield (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).findOne(id));
    if (error2)
        throw new common_1.ServerError(error2.message, `users.route -> patchResource`);
    return resource;
});
exports.patchResource = patchResource;
const deleteResource = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let [result, error] = yield (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).delete(id));
    if (error)
        throw new common_1.ServerError(error.message, `users.route -> deleteResource`);
    return result;
});
exports.deleteResource = deleteResource;
