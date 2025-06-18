import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType, UserDocument } from '../domain/user.entity';
import { UserRepository } from '../infrastructure/user.repository';
import { UpdateUserInputDto } from '../api/input-dto/update-user.input.dto';
import { CreateUserInputDto } from '../api/input-dto/users.input-dto';
import { BcryptService } from 'src/core/services/Bcrypt.service';
import { UserViewDto } from '../api/view-dto/users.view-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: UserModelType,
    private usersRepository: UserRepository,
    private bcryptService: BcryptService,
  ) {}

  async createUser(dto: CreateUserInputDto): Promise<UserViewDto> {
    const passwordHash = await this.bcryptService.generateHash(dto.password);

    const user = this.UserModel.createInstance({
      email: dto.email,
      login: dto.login,
      passwordHash: passwordHash,
    });

    await this.usersRepository.save(user);

    return UserViewDto.mapToView(user);
  }

  async updateUser(id: string, dto: UpdateUserInputDto): Promise<void> {
    const user = await this.usersRepository.findOrNotFoundFail(id);

    user.update(dto);

    await this.usersRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOrNotFoundFail(id);

    user.makeDeleted();

    await this.usersRepository.save(user);
  }
}
