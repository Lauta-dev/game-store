import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from "@nestjs/platform-express"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.disable('x-powered-by', 'X-Powered-By');
  app.enableCors()
  await app.listen(process.env.NEST_APP_PORT);

  console.log(`App in: localhost:${process.env.NEST_APP_PORT}`);
}
bootstrap();
