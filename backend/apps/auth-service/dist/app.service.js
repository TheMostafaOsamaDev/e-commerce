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
const microservices_1 = require("@nestjs/microservices");
let AppService = class AppService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async createUser(data) {
        const [user, _] = await user_model_1.User.findOrCreate({
            where: { email: data.email },
            defaults: {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                isAdmin: false,
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
    async signIn(signInDto) {
        const user = await user_model_1.User.findOne({
            where: { email: signInDto.email },
        });
        if (!user) {
            throw new microservices_1.RpcException({
                statusCode: 404,
                message: 'User not found',
            });
        }
        const isMatched = await user.comparePassword(signInDto.password);
        if (!isMatched) {
            throw new microservices_1.RpcException({
                statusCode: 400,
                message: 'Invalid credentials',
            });
        }
        const userData = user.get({ plain: true });
        console.log(userData);
        return {
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
        };
    }
    async cacheSessions({ userData }) {
        const authedAt = new Date().toISOString();
        const key = `${userData.email}-${authedAt}`;
        const token = this.generateToken({ userData, isHashed: true, authedAt });
        await this.cacheManager.set(key, { ...userData, token }, config_1.AUTH_TTL);
        return {
            token,
            user: userData,
            authedAt,
        };
    }
    generateToken({ userData, isHashed, authedAt, }) {
        const expiresIn = config_1.AUTH_TTL | config_1.TOKEN_TIME;
        const TOKEN_SECRET = isHashed
            ? process.env.TOKEN_SECRET
            : process.env.CLIENT_TOKEN_SECRET;
        const token = jwt.sign({
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            authedAt,
        }, TOKEN_SECRET, { expiresIn });
        if (isHashed) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(token, salt);
            return hash;
        }
        return token;
    }
    compareToken(userData, hashedToken) {
        const token = this.generateToken({
            userData,
            isHashed: false,
            authedAt: userData.authedAt || '',
        });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(token, salt);
        return bcrypt.compareSync(token, hash);
    }
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.CLIENT_TOKEN_SECRET, {
                ignoreExpiration: true,
            });
            const user = decoded;
            if (user) {
                const key = `${user.email}-${user.authedAt}`;
                const cachedUser = await this.cacheManager.get(key);
                if (!cachedUser) {
                    throw new microservices_1.RpcException({
                        statusCode: 401,
                        message: 'Unauthorized',
                    });
                }
                console.log(cachedUser);
                console.log({
                    token,
                    cachedToken: cachedUser.token,
                });
                const userPayload = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                };
                const isMatched = this.compareToken(userPayload, cachedUser.token);
                if (!isMatched) {
                    throw new microservices_1.RpcException({
                        statusCode: 401,
                        message: 'Unauthorized',
                    });
                }
                const currentTime = Math.floor(Date.now() / 1000);
                const exp = decoded.exp || 0;
                if (exp < currentTime) {
                    const key = `${user.email}-${user.authedAt}`;
                    await this.cacheManager.del(key);
                    const newCachedUser = await this.cacheSessions({
                        userData: userPayload,
                    });
                    const newToken = this.generateToken({
                        userData: userPayload,
                        isHashed: false,
                        authedAt: newCachedUser.authedAt,
                    });
                    return {
                        ...newCachedUser,
                        token: newToken,
                        isNew: true,
                    };
                }
                else {
                    return {
                        ...cachedUser,
                        token,
                        isNew: false,
                    };
                }
            }
            return decoded;
        }
        catch (e) {
            console.log(e);
            throw new microservices_1.RpcException({
                statusCode: 401,
                message: 'Invalid token',
            });
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], AppService);
//# sourceMappingURL=app.service.js.map