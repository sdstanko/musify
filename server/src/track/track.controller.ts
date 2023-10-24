import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express' 
import { CreateTrackDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";
import * as mongoose from 'mongoose'

@Controller('/tracks')
export class TrackController {
	constructor(private trackService: TrackService) {}
	
	@Post()
	@UseInterceptors(FileFieldsInterceptor([
		{ name: 'picture', maxCount: 1 },
		{ name: 'audio', maxCount: 1 },
	]))
	create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
		const {audio} = files
		console.log(dto, audio)
		return this.trackService.create(dto.album, dto.name, dto.artist, audio[0]);
	}
	
	@Get()
	getAll(@Query('count') count: number,
			@Query('offset') offset: number) {
		return this.trackService.getAll(count, offset)
	}
	
	@Get('/search')
	search(@Query('q') query: string) {
		return this.trackService.search(query)
	}

	@Get(':id')
	getOne(@Param('id') id: mongoose.Types.ObjectId) {
		return this.trackService.getOne(id)
	}

	@Delete(':id')
	delete(@Param('id') id: mongoose.Types.ObjectId) {
		return this.trackService.delete(id)
	}

	// @Post('/listen/:id')
	// listen(@Param('id') id: mongoose.Types.ObjectId) {
	// 	return this.trackService.listen(id)
	// }

}