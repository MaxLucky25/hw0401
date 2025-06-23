import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from '../application/posts.service';
import { PostQueryRepository } from '../infrastructure/query/post.query-repository';
import { PostViewDto } from './view-dto/post.view-dto';
import { GetPostsQueryParams } from './input-dto/get-posts-query-params.input-dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { UpdatePostInputDto } from './input-dto/update-post.input.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postQueryRepository: PostQueryRepository,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<PostViewDto> {
    return this.postQueryRepository.getByIdNotFoundFail(id);
  }

  @Get()
  async findAll(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postQueryRepository.getAllPost(query);
  }

  @Post()
  async create(@Body() dto: CreatePostDto): Promise<PostViewDto> {
    return this.postsService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePostInputDto,
  ): Promise<void> {
    return this.postsService.updatePost(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
