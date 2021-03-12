"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const port = process.env.PORT || 3500;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const documentOptions = new swagger_1.DocumentBuilder()
        .setTitle('Sensrnet Sync API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, documentOptions);
    swagger_1.SwaggerModule.setup('/api', app, document);
    await app.listen(port);
}
bootstrap().then();
//# sourceMappingURL=main.js.map