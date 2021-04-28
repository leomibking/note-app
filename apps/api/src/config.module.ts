import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { environment } from './environments/environment';

const ConfigModuleExports = NestConfigModule.forRoot({
  isGlobal: true,
  load: [() => environment],
});

@Global()
@Module({
  imports: [ConfigModuleExports],
  exports: [ConfigModuleExports],
})
export class ConfigModule {}
