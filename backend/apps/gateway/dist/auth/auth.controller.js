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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const microservices_1 = require("@nestjs/microservices");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const auth_Interceptor_1 = require("./auth.Interceptor");
const sign_in_dto_1 = require("./dto/sign-in.dto");
let AuthController = class AuthController {
    constructor(authService, authClient) {
        this.authService = authService;
        this.authClient = authClient;
    }
    async createAccount(data) {
        return this.authClient.send({ cmd: 'create_account' }, data);
    }
    async signIn(data, res) {
        console.log(`From AuthController: ${JSON.stringify(data)}`);
        return this.authClient.send({ cmd: 'sign_in' }, data);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.UseInterceptors)(auth_Interceptor_1.AuthInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, common_1.UseInterceptors)(auth_Interceptor_1.AuthInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        microservices_1.ClientProxy])
], AuthController);
//# sourceMappingURL=auth.controller.js.map