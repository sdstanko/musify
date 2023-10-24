import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { MongooseModule } from '@nestjs/mongoose'
import { Album, AlbumSchema } from "./schema/album.schema";
import { FileService } from "../file/file.service";
import { TrackService } from "../track/track.service";
import { Track, TrackSchema } from "src/track/schema/track.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}, {name: Track.name, schema: TrackSchema}])
	],
	controllers: [AlbumController],
	providers: [AlbumService, FileService, TrackService]
})

export class AlbumModule {}