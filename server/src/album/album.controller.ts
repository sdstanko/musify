import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express' 
import { CreateAlbumDto } from "./dto/create-album.dto";
import { AlbumService } from "./album.service";
import { TrackService } from "../track/track.service";
import * as mongoose from 'mongoose'

@Controller('/albums')
export class AlbumController {
	constructor(private albumService: AlbumService) {}
	
	@Post()
	@UseInterceptors(AnyFilesInterceptor())
	create(@UploadedFiles() files, @Body() textData) {
		const albumName = textData.albumName
		const albumArtist = textData.albumArtist
		const picture = files.pop()

		return this.albumService.create(textData, files, picture, albumName, albumArtist)
	}

	@Get()
	getAll(@Query('count') count: number,
			@Query('offset') offset: number) {
		return this.albumService.getAll(count, offset)
	}

	@Get(':id')
	getOne(@Param('id') id: mongoose.Types.ObjectId) {
		return this.albumService.getOne(id)
	}

}