import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { UpdateUserInputDto } from '../api/input-dto/update-user.input.dto';
import { CreateUserDomainDto } from './dto/create-user.domain.dto';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  login: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  createdAt: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isEmailConfirmed: boolean;

  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;

  static createInstance(dto: CreateUserDomainDto): UserDocument {
    const user = new this();
    user.email = dto.email;
    user.passwordHash = dto.passwordHash;
    user.login = dto.login;
    user.isEmailConfirmed = false;

    return user as UserDocument;
  }

  makeDeleted() {
    if (this.deletedAt !== null) {
      throw new Error('Entity already deleted');
    }
    this.deletedAt = new Date();
  }
  update(dto: UpdateUserInputDto) {
    if (dto.email !== this.email) {
      this.isEmailConfirmed = false;
    }
    this.email = dto.email;
  }
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserModelType = Model<UserDocument> & typeof User;
