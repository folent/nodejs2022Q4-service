import 'dotenv/config'
import { dirname, join } from 'path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*'
  });

  app.useGlobalPipes(new ValidationPipe()); 

  const rootDirname = dirname(__dirname);
  const yamlFile = await readFile(join(rootDirname, 'doc/api.yaml'), 'utf-8');
  const document = parse(yamlFile);
  SwaggerModule.setup('doc', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 4000);
}
bootstrap();
