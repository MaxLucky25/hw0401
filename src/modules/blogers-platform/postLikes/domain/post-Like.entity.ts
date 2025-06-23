import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LikeStatus } from 'src/core/dto/like-status.dto';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class PostLike {
  @Prop({ required: true })
  postId: string;
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  status: LikeStatus;
}

export type PostLikeDocument = HydratedDocument<PostLike>;

export const PostLikeSchema = SchemaFactory.createForClass(PostLike);
