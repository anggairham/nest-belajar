import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// cookie fitur tambahan dari express js
import * as cookieParser from 'cookie-parser';
// mustache fitur tambahan dari express js
// merubah dari nest ke nestexpress
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustache from 'mustache-express'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('rahasia'))
  app.set('views',__dirname+'/../views');
  app.set('view engine','html')
  app.engine('html',mustache())
  
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
  // await app.listen(3000);
}
bootstrap();
