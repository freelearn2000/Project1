"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = exports.ApiNotImplementedError = exports.AuthenticationError = exports.EntityNotFoundError = exports.DataValidationError = exports.ServerError = exports.MyError = exports.paging = exports.fieldFilter = exports.handleAsync = void 0;
const handleAsync = (promise) => {
    return promise
        .then((data) => [data, null])
        .catch((error) => [null, error]);
};
exports.handleAsync = handleAsync;
// 1. Filter (based on fields)
// Format: ?fields=id,title
const fieldFilter = (options) => {
    let fields = options.fields;
    return fields = fields === null || fields === void 0 ? void 0 : fields.split(`,`).map((item) => `entity.${item}`);
};
exports.fieldFilter = fieldFilter;
// 2. Pagination (based on offset and limit) 
// offset : start of record
// limit : number of records
// Format : offset=0&limit=5
const paging = (options) => {
    var _a;
    let offset = (_a = options.offset) !== null && _a !== void 0 ? _a : 0;
    let limit = options.limit;
    return { offset, limit };
};
exports.paging = paging;
class MyError extends Error {
    constructor(status, message, origin, clientMessage) {
        super(message);
        this.status = status;
        this.origin = origin;
        this.clientMessage = clientMessage;
    }
}
exports.MyError = MyError;
class ServerError extends MyError {
    constructor(message, origin) {
        super(500, message, origin, 'Server Error!');
    }
}
exports.ServerError = ServerError;
class DataValidationError extends MyError {
    constructor(message, origin) {
        super(400, message, origin, 'Data is not valid!');
    }
}
exports.DataValidationError = DataValidationError;
class EntityNotFoundError extends MyError {
    constructor(id, origin) {
        super(400, `Entity with id: ${id} not found!`, origin, `Entity with id: ${id} not found!`);
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class AuthenticationError extends MyError {
    constructor(error, origin) {
        super(401, error !== null && error !== void 0 ? error : `Authentication Error!`, origin, `Authentication Error!`);
    }
}
exports.AuthenticationError = AuthenticationError;
class ApiNotImplementedError extends MyError {
    constructor(message, origin) {
        super(404, message, origin, `API is not implemented`);
    }
}
exports.ApiNotImplementedError = ApiNotImplementedError;
class NotImplementedError extends MyError {
    constructor(message, origin) {
        super(404, message, origin, `Not implemented`);
    }
}
exports.NotImplementedError = NotImplementedError;
