"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserValidator = exports.UserValidator = exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
class UserValidator {
}
__decorate([
    (0, class_validator_1.Matches)(/^[a-zA-Z\-]+$/, { message: 'Name should contain alphabets only' }),
    (0, class_validator_1.IsString)({ message: 'Name should be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name should be defined' }),
    __metadata("design:type", String)
], UserValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email should be defined' }),
    __metadata("design:type", String)
], UserValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Matches)(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password must contain atleast eight characters including one uppercase letter, one lowercase letter, and one number or special character' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password should be defined' }),
    __metadata("design:type", String)
], UserValidator.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Address should be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Address should be defined' }),
    __metadata("design:type", String)
], UserValidator.prototype, "address", void 0);
exports.UserValidator = UserValidator;
class AuthUserValidator {
}
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email should be defined' }),
    __metadata("design:type", String)
], AuthUserValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password should be defined' }),
    __metadata("design:type", String)
], AuthUserValidator.prototype, "password", void 0);
exports.AuthUserValidator = AuthUserValidator;
