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
const jwt = require("jsonwebtoken");
const update_auth_dto_1 = require("./dto/update-auth.dto");
const user_model_1 = require("./models/user.model");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async createAccount(data) {
        let isAdmin = false;
        if (data.isAdmin) {
            if (!data.passkey) {
                throw new microservices_1.RpcException({
                    message: 'Passkey must be provided',
                    status: 400,
                });
            }
            isAdmin = await this.appService.comparePasskey({ passkey: data.passkey });
        }
        const user = await this.appService.createUser({
            ...data,
            isAdmin,
        });
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: data.password,
            isAdmin,
        };
        const cachedUser = await this.appService.createSession({ userData });
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
            isAdmin: false,
        };
        const cachedUser = await this.appService.createSession({ userData });
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
    async verifyToken(token) {
        return this.appService.verifyToken(token);
    }
    async logoutUser(token) {
        if (!token) {
            throw new microservices_1.RpcException({
                code: 401,
                message: 'Unauthorized',
            });
        }
        const decodedUser = jwt.decode(token);
        console.log({
            email: decodedUser.email,
            authedAt: decodedUser.authedAt,
        });
        if (decodedUser?.email && decodedUser?.authedAt)
            await this.appService.destroySession(decodedUser.email, decodedUser.authedAt);
    }
    async updateProfile(data) {
        const user = await user_model_1.User.findOne({ where: { id: data.id } });
        const decodedUser = jwt.decode(data.token);
        if (!user || !data.token || !decodedUser?.authedAt) {
            throw new microservices_1.RpcException({
                code: 404,
                message: 'User not found',
            });
        }
        let hasChanged = false;
        for (const key of Object.keys(data)) {
            if (data[key] && data[key] !== 'id' && user[key]) {
                if (user[key] !== data[key]) {
                    hasChanged = true;
                    user[key] = data[key];
                }
            }
        }
        if (hasChanged) {
            await user.save();
            const cachedUser = await this.appService.createSession({
                userData: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                },
            });
            const token = this.appService.generateToken({
                userData: cachedUser.user,
                isHashed: false,
                authedAt: cachedUser.authedAt,
            });
            await this.appService.destroySession(user.email, decodedUser.authedAt);
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                token,
                isNew: true,
            };
        }
        return {
            message: 'No changes made',
        };
    }
    async isAdmin(body) {
        const user = await user_model_1.User.findOne({ where: { email: body.email } });
        return user?.isAdmin;
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
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'verify_token' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyToken", null);
__decorate([
    (0, microservices_1.EventPattern)('signout_user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logoutUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_profile' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_auth_dto_1.UpdateAuthDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateProfile", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'check_if_admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "isAdmin", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map