import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { imageSizeSchema, ImageSize } from './imageSize.schema';

@Schema()
export class Image extends Document {
  @Prop({ type: imageSizeSchema })
  large: ImageSize;

  @Prop({ type: imageSizeSchema })
  medium: ImageSize;

  @Prop({ type: imageSizeSchema })
  small: ImageSize;
}

export const imageSchema = SchemaFactory.createForClass(Image);
