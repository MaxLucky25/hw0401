import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { Blog, BlogDocument } from '../domain/blog.entity';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  create(dto: CreateBlogDto) {
    return this.blogModel.create({ ...dto, createdAt: new Date() });
  }

  findAll() {
    return this.blogModel.find().lean();
  }

  findOne(id: string) {
    return this.blogModel.findById(id).lean();
  }

  async update(id: string, dto: CreateBlogDto) {
    const res = await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
    return res ? true : false;
  }

  async remove(id: string) {
    const result = await this.blogModel.findByIdAndDelete(id);
    return result ? true : false;
  }
}
