import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.entity';
import { UsersController } from './api/user.controller';
import { UsersService } from './application/user.service';
import { UsersQueryRepository } from './infrastructure/query/users.query-repository';
import { UserRepository } from './infrastructure/user.repository';
import { BcryptService } from '../../core/services/Bcrypt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersQueryRepository,
    UserRepository,
    BcryptService,
  ],
})
export class UsersAccountModule {}
