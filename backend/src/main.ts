import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe());

   // Configuração do Swagger
   const config = new DocumentBuilder()
      .setTitle('Todo API')
      .setDescription('API para tarefas')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   app.enableCors();

   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
