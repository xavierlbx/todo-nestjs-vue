import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe());

   // Configuração do Swagger
   const config = new DocumentBuilder()
      .setTitle('Minha API NestJS')
      .setDescription('API para gerenciamento de usuários e todos')
      .setVersion('1.0')
      // .addBearerAuth() // JWT Auth no Swagger
      .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
