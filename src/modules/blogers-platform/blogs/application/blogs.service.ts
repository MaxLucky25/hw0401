import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { BlogRepository } from '../infrastructure/blog.repository';
import { BlogViewDto } from '../api/view-dto/blog.view-dto';
import { UpdateBlogInputDto } from '../api/input-dto/update-blog.input.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType,
    private blogRepository: BlogRepository,
  ) {}

  async create(dto: CreateBlogDto): Promise<BlogViewDto> {
    const blog = this.BlogModel.createBlog({
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
    });

    await this.blogRepository.save(blog);

    return BlogViewDto.mapToView(blog);
  }

  async updateBlog(id: string, dto: UpdateBlogInputDto): Promise<void> {
    const blog = await this.blogRepository.findOrNotFoundFail(id);

    blog.update(dto);

    await this.blogRepository.save(blog);
  }

  async deleteBlog(id: string) {
    const blog = await this.blogRepository.findOrNotFoundFail(id);

    blog.makeDeleted();

    await this.blogRepository.save(blog);
  }
}
