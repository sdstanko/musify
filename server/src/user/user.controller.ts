import { Body, Controller, Post, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto.userName, dto.email, dto.password);
  }

  @Get('/')
  getOne(@Body() data) {
    return this.userService.findOne(data.userName)
  }

  @Get(':id')
  getById(@Param() {id}) {
    return this.userService.getById(id);
  }

  @Post('like')
  libraryToggle(@Body() data) {
    return this.userService.libraryToggle(data);
  }
}