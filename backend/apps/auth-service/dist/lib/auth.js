"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const promise_1 = require("mysql2/promise");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, promise_1.createPool)({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            firstName: {
                type: 'string',
                required: true,
            },
            lastName: {
                type: 'string',
                required: true,
            },
        },
    },
});
//# sourceMappingURL=auth.js.map