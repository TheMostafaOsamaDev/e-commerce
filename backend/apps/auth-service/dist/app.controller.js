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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async createAccount(data) {
        const user = await this.appService.createUser(data);
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
        };
        const cachedUser = await this.appService.cacheSessions({ userData });
        const token = this.appService.generateToken({
            userData: cachedUser.user,
            isHashed: false,
            authedAt: cachedUser.authedAt,
        });
        return {
            ...cachedUser,
            token,
        };
    }
    async signIn(data) {
        const user = await this.appService.signIn(data);
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
        };
        const cachedUser = await this.appService.cacheSessions({ userData });
        const token = this.appService.generateToken({
            userData,
            isHashed: false,
            authedAt: cachedUser.authedAt,
        });
        return {
            user,
            token,
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_account' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createAccount", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'sign_in' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signIn", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map