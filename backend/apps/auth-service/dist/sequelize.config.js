"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./models/user.model");
const session_model_1 = require("./models/session.model");
const account_model_1 = require("./models/account.model");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    models: [user_model_1.User, session_model_1.Session, account_model_1.Account],
    logging: false,
});
//# sourceMappingURL=sequelize.config.js.map