import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { BlogsService } from '../application/blogs.service';
import { BlogQueryRepository } from '../infrastructure/query/blog.query-repository';
import { BlogViewDto } from './view-dto/blog.view-dto';
import { GetBlogsQueryParams } from './input-dto/get-blogs-query-params.input-dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { UpdateBlogInputDto } from './input-dto/update-blog.input.dto';
import { PostsService } from '../../posts/application/posts.service';
import { CreatePostForBlogsInputDto } from '../../posts/api/input-dto/create-postForBlogsInput.dto';
import { PostViewDto } from '../../posts/api/view-dto/post.view-dto';
import { PostQueryRepository } from '../../posts/infrastructure/query/post.query-repository';
import { GetPostsQueryParams } from '../../posts/api/input-dto/get-posts-query-params.input-dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogQueryRepository: BlogQueryRepository,
    private postQueryRepository: PostQueryRepository,
    private blogsService: BlogsService,
    private postsService: PostsService,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BlogViewDto> {
    return this.blogQueryRepository.getByIdOrNotFoundFail(id);
  }

  @Get()
  async getAll(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogQueryRepository.getAll(query);
  }

  @Get(':id/posts')
  async getPostsForBlog(
    @Param('id') id: string,
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    await this.getById(id);
    return this.postQueryRepository.getAllPostForBlog(id, query);
  }

  @Post()
  async create(@Body() body: CreateBlogDto): Promise<BlogViewDto> {
    return this.blogsService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateBlogInputDto,
  ): Promise<void> {
    return this.blogsService.updateBlog(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(@Param('id') id: string): Promise<void> {
    return this.blogsService.deleteBlog(id);
  }

  @Post(':id/posts')
  async createPostForBlog(
    @Param('id') id: string,
    @Body() body: CreatePostForBlogsInputDto,
  ): Promise<PostViewDto | null> {
    return this.postsService.createPostForBlog(id, body);
  }
}
