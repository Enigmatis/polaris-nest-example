import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setApp } from '@enigmatis/polaris-nest';
import * as polarisProperties from "./resources/polaris-properties.json"
import { INestApplication } from '@nestjs/common';
export let app: INestApplication = {} as INestApplication;
async function bootstrap() {
  app = await NestFactory.create(AppModule);
  setApp(app)
  await app.listen(polarisProperties.port);
}
bootstrap();
