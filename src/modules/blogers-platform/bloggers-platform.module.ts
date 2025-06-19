import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs/api/blogs.controller';
import { PostsController } from './posts/api/posts.controller';
import { Module } from '@nestjs/common';
import { Blog, BlogSchema } from './blogs/domain/blog.entity';
import { Post, PostSchema } from './posts/domain/post.entity';
import { BlogsService } from './blogs/application/blogs.service';
import { PostsService } from './posts/application/posts.service';
import { BlogQueryRepository } from './blogs/infrastructure/query/blog.query-repository';
import { BlogRepository } from './blogs/infrastructure/blog.repository';
import { PostQueryRepository } from './posts/infrastructure/query/post.query-repository';
import { PostRepository } from './posts/infrastructure/postRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [BlogsController, PostsController],
  providers: [
    BlogsService,
    BlogRepository,
    BlogQueryRepository,
    PostsService,
    PostRepository,
    PostQueryRepository,
  ],
})
export class BloggersPlatformModule {}
