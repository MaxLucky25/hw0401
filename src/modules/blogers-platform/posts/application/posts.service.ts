import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../domain/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(dto: CreatePostDto) {
    return this.postModel.create({ ...dto, createdAt: new Date() });
  }

  findAll() {
    return this.postModel.find().lean();
  }

  findOne(id: string) {
    return this.postModel.findById(id).lean();
  }

  async update(id: string, dto: CreatePostDto) {
    const result = await this.postModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return result ? true : false;
  }

  async remove(id: string) {
    const result = await this.postModel.findByIdAndDelete(id);
    return result ? true : false;
  }
}
