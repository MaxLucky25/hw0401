import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('testing')
export class TestingController {
  constructor(@InjectConnection() private readonly dbConnection: Connection) {}

  @Delete(':all-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAll() {
    const collection = await this.dbConnection.listCollections();

    const promises = collection.map((collection) =>
      this.dbConnection.collection(collection.name).deleteMany({}),
    );
    await Promise.all(promises);
  }
}
