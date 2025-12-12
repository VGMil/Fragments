import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); // Use explicit cors middleware
  // app.enableCors({...}); // Disable built-in Nest cors to avoid conflicts if using middleware
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
