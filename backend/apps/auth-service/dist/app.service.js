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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("./user.model");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("./config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let AppService = class AppService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async createUser(data) {
        const [user, created] = await user_model_1.User.findOrCreate({
            where: { email: data.email },
            defaults: {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            },
        });
        const userData = user.get({ plain: true });
        return {
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
        };
    }
    async cacheSessions({ userData }) {
        const key = `${userData.email}`;
        const token = this.generateToken({ userData, isHashed: true });
        await this.cacheManager.set(key, { ...userData, token }, config_1.AUTH_TTL);
        return {
            token,
            user: userData,
        };
    }
    generateToken({ userData, isHashed, }) {
        const expiresIn = config_1.AUTH_TTL | config_1.TOKEN_TIME;
        const token = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn });
        if (isHashed) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(token, salt);
            return hash;
        }
        return token;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], AppService);
//# sourceMappingURL=app.service.js.map