import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schema/track.schema';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileService, FileType } from 'src/file/file.service';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async create(name, artist, audio, album): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const track = await this.trackModel.create({
      album,
      name,
      artist,
      audio: audioPath,
    });
    return track;
  }
  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(+offset).limit(+count);
    return tracks;
  }
  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
  async getOne(id: mongoose.Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id);
    return track;
  }
  async delete(id: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }
  // async listen(id: mongoose.Types.ObjectId) {
  // 	const track = await this.trackModel.findById(id)
  // 	track.listens += 1
  // 	track.save()
  // }
}
