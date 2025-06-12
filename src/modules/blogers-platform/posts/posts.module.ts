import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './api/posts.controller';
import { PostsService } from './application/posts.service';
import { Post, PostSchema } from './domain/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
