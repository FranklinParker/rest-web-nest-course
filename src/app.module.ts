import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import * as helmet from 'helmet';

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forRoot('mongodb://localhost/nestclass'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(helmet(), LoggerMiddleware)
      .forRoutes({ path: 'contacts*', method: RequestMethod.ALL });
  }
}
