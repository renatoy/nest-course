import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController], // All the http verbs (GET, POST, PATCH), url endpoints
  providers: [AppService], // Business stuff, query logic
})
export class AppModule {}
