import 'dotenv/config'
import { dirname, join } from 'path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { MyLogger } from './shared/logger/mylogger.service';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 4000
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*'
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(MyLogger));

  const rootDirname = dirname(__dirname);
  const yamlFile = await readFile(join(rootDirname, 'doc/api.yaml'), 'utf-8');
  const document = parse(yamlFile);
  SwaggerModule.setup('doc', app, document);

  const log = app.get(MyLogger);

  process.on('uncaughtException', (error) => {
    log.error('uncaughtException: ' + error);
    process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    log.error('unhandledRejection: ' + error);
    process.exit(1);
  });

  await app.listen(PORT, () => `Server is starting listen ${PORT} port`);
}
bootstrap();
