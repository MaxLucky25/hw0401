import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from '../domain/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostViewDto } from '../api/view-dto/post.view-dto';
import { PostRepository } from '../infrastructure/postRepository';
import { UpdatePostInputDto } from '../api/input-dto/update-post.input.dto';
import { BlogRepository } from '../../blogs/infrastructure/blog.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private PostModel: PostModelType,
    private postRepository: PostRepository,
    private blogRepository: BlogRepository,
  ) {}

  async create(dto: CreatePostDto): Promise<PostViewDto> {
    const blog = await this.blogRepository.findOrNotFoundFail(dto.blogId);
    const post = this.PostModel.createPost({
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blog.name,
    });

    await this.postRepository.save(post);

    return PostViewDto.mapToView(post);
  }

  async updatePost(id: string, dto: UpdatePostInputDto): Promise<void> {
    const post = await this.postRepository.findOrNotFoundFail(id);

    post.updatePost(dto);

    await this.postRepository.save(post);
  }

  async deletePost(id: string) {
    const post = await this.postRepository.findOrNotFoundFail(id);

    post.makeDelete();

    await this.postRepository.save(post);
  }
  async createPostForBlog(blogId: string, input: CreatePostDto) {
    try {
      const blog = await this.blogRepository.findOrNotFoundFail(blogId);
      if (!blog) return null;
      return await this.create({ ...input, blogId });
    } catch {
      return null;
    }
  }
}
