import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersAccountModule } from './modules/user-accounts/user-accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/${Cluster0103}',
    ),
    UsersAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
