import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
@Injectable()
export class BcryptService {
  async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
