import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolarisLoggerModule, PolarisLoggerService, PolarisModule, TypeOrmModule } from '@enigmatis/polaris-nest';
import { createOptionsFactory } from './polaris-server-options-factory/polaris-server-options-factory-service';
import { TypeOrmOptionsFactoryService } from './type-orm-options-factory/type-orm-options-factory.service';

@Module({
  imports: [PolarisModule.registerAsync({
    useFactory: createOptionsFactory,
  }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptionsFactoryService,
      inject: [PolarisLoggerService],
      imports: [PolarisLoggerModule],
    })],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule {
}
