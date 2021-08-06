import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.PORT || 3500;
    const app = await NestFactory.create(AppModule, {
        logger:
            process.env.NODE_ENV === 'development'
                ? ['log', 'debug', 'error', 'verbose', 'warn']
                : ['error', 'warn', 'log'],
    });
    app.useGlobalPipes(new ValidationPipe());

    const documentOptions = new DocumentBuilder()
        .setTitle('SensRNet Sync API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, documentOptions);
    SwaggerModule.setup('/api', app, document);

    await app.listen(port);
}

bootstrap().then();
