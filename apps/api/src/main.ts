import { LogService, TypeErrorExceptionFilter } from '@note-app/framework';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environments/environment';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
// const helmet = require('helmet');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  LogService.configure(app);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new TypeErrorExceptionFilter());
  const port = app.get(ConfigService).get<number>('server.port');
  await app.listen(port);
  new Logger().log(`Application is running on port ${port}...`);
}

bootstrap().then(() => {
  //
});
