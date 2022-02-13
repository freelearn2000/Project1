"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const common_1 = require("../shared/common");
const valMiddleware = (validator, options = {}) => {
    return (req, res, next) => {
        (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(validator, req.body), Object.assign(Object.assign({}, options), { forbidNonWhitelisted: true, whitelist: true }))
            .then((errors) => {
            if (errors.length) {
                const messages = errors.map((error) => {
                    const constraints = error.constraints;
                    return Object.values(constraints).join(' ; ');
                }).join(' ; ');
                // Validation failed!
                next(new common_1.DataValidationError(messages, 'val.middleware->valMiddleware'));
            }
            else {
                // Validation succeeded, move to next middleware
                next();
            }
        })
            .catch(error => {
            next(new common_1.DataValidationError(error.message, 'val.middleware->valMiddleware'));
        });
    };
};
exports.default = valMiddleware;
