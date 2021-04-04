import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ImageSize {
  @Prop()
  url: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  size: number;
}
export const imageSizeSchema = SchemaFactory.createForClass(ImageSize);
