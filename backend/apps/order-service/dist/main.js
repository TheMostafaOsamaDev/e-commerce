"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_QUEUE,
            queueOptions: {
                durable: false,
            },
        },
    });
    common_1.Logger.warn('Order-Service is running...');
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map