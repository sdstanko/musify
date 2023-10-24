import { Injectable } from '@nestjs/common';
import { Album, AlbumDocument } from './schema/album.schema';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileService, FileType } from 'src/file/file.service';
import { TrackService } from 'src/track/track.service';
import { Track, TrackDocument } from 'src/track/schema/track.schema';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService,
    private trackService: TrackService,
  ) {}

  async create(
    textData,
    files,
    picture,
    albumName,
    albumArtist,
  ): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const album = await this.albumModel.create({
      name: albumName,
      artist: albumArtist,
      picture: picturePath,
    });

    let tracks: string[] = [];

    const isMulti = files.length > 1;

    const uploadTracks = async (audio, i) => {
      const track = {
        name: isMulti ? textData.name[i] : textData.name,
        artist: isMulti ? textData.artist[i] : textData.artist,
        audio: audio,
        album: album._id,
      };

      const uploadedTrack = await this.trackService.create(
        track.name,
        track.artist,
        track.audio,
        track.album,
      );
      const id = uploadedTrack._id.toString();
      tracks.push(id);
    };

    for (let i = 0; i < files.length; i++) {
      await uploadTracks(files[i], i);
    }

    return this.albumModel.findOneAndUpdate(
      { _id: album._id },
      {
        tracks: tracks,
      },
      { returnDocument: 'after' },
    );
  }

  async getAll(count = 100, offset = 0): Promise<Album[]> {
    const albums = await this.albumModel.find().skip(+offset).limit(+count);
    return albums;
  }

  async getOne(id: mongoose.Types.ObjectId): Promise<Album> {
    const track = await this.albumModel.findById(id);
    return track;
  }
}
