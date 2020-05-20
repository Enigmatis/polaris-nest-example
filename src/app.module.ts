import { Module } from '@nestjs/common';
import { PolarisLoggerModule, PolarisLoggerService, PolarisModule, TypeOrmModule } from '@enigmatis/polaris-nest';
import { createOptionsFactory } from './polaris-server-options-factory/polaris-server-options-factory-service';
import { TypeOrmOptionsFactoryService } from './type-orm-options-factory/type-orm-options-factory.service';
import { AuthorModule } from './graphql/modules/author.module';
import { BookModule } from './graphql/modules/book.module';
import { DataInitializationModule } from './graphql/modules/data-initialization.module';

@Module({
  imports: [PolarisModule.registerAsync({
    useFactory: createOptionsFactory,
  }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptionsFactoryService,
      inject: [PolarisLoggerService],
      imports: [PolarisLoggerModule],
    }),
  AuthorModule,
  BookModule,
  DataInitializationModule]
})
export class AppModule {
}
