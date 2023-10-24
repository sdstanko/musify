import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;
  
  @Prop()
  artist: string;

  @Prop()
  album: string;

  @Prop()
  audio: string;

  _id: mongoose.Types.ObjectId;
}

export const TrackSchema = SchemaFactory.createForClass(Track);