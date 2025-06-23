import { UserDocument } from '../../domain/user.entity';

export class UserViewDto {
  id: string;
  login: string;
  email: string;
  createdAt: string;

  static mapToView(user: UserDocument): UserViewDto {
    return {
      id: user._id.toString(),
      email: user.email,
      login: user.login,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
