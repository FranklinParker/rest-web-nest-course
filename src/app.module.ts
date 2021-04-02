import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
      { path: 'contacts*', method: RequestMethod.GET },

      { path: 'contacts', method: RequestMethod.POST },
    );
  }
}
