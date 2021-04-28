import { Module } from '@nestjs/common';
import { OrmModule } from '@note-app/framework';
import { ConfigModule } from './config.module';

@Module({
  imports: [ConfigModule, OrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
