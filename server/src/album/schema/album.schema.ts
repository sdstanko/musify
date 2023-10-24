import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop()
  name: string;
  
  @Prop()
  artist: string;

  @Prop()
  picture: string;

  @Prop()
  tracks: string[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);