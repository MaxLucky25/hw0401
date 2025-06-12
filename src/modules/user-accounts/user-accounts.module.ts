import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.entity';
import { UsersController } from './api/user.controller';
import { UsersService } from './application/user.service';
import { UsersQueryRepository } from './infrastructure/query/users.query-repository';
import { UsersRepository } from './infrastructure/users.repository';
import { BcryptService } from '../../core/Bcrypt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersQueryRepository,
    UsersRepository,
    BcryptService,
  ],
})
export class UsersAccountModule {}
