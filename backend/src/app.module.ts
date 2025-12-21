import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './features/auth/auth.module';
import { ProfileModule } from './features/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfrastructureModule,
    CoreModule,
    AuthModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
