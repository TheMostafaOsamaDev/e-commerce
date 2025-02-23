"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("./config");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.setGlobalPrefix('api/v1');
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [config_1.RABBITMQ_URL],
            queue: process.env.GATEWAY_QUEUE ?? 'gateway_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
    app.startAllMicroservices();
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map