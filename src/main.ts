import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*'
  });

  app.useGlobalPipes(new ValidationPipe()); 

  const config = new DocumentBuilder()
  .setTitle('Home Library Service')
  .setVersion('1.0.0')
  .setDescription('Home music library service')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 4000);
}
bootstrap();
