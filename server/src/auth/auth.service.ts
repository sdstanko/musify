import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(userName: string, password: string): Promise<any> {
    const existingUser = await this.userService.findOne(userName);
    let comparePassword = bcrypt.compareSync(password, existingUser.password)

    if (!comparePassword) {
      throw new UnauthorizedException();
    }
    const payload = { _id: existingUser._id, userName: existingUser.userName };
    return {token: await this.jwtService.signAsync(payload)}
  }

  async check(user): Promise<any> {
    const { _id, userName } = user;
    return {token: await this.jwtService.signAsync({_id, userName})}
  }
}