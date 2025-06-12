import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { BlogsService } from '../application/blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() dto: CreateBlogDto) {
    return this.blogsService.create(dto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateBlogDto) {
    return this.blogsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
