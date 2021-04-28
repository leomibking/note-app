import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule as NestRedisModule } from 'nestjs-redis';

const RedisModuleExports = NestRedisModule.forRootAsync({
  useFactory: (configService: ConfigService) => configService.get('redis'),
  inject: [ConfigService],
});

@Global()
@Module({
  imports: [RedisModuleExports],
  exports: [RedisModuleExports],
})
export class RedisModule {}
