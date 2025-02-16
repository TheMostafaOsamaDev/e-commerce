"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const sequelize_config_1 = require("./sequelize.config");
async function bootstrap() {
    await sequelize_config_1.sequelize.authenticate();
    await sequelize_config_1.sequelize.sync();
    common_1.Logger.log('Connected to MySQL & Synced Models');
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_QUEUE ?? 'auth_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    common_1.Logger.warn('Auth-Service is running...');
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map