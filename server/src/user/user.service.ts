import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userName, email, password): Promise<User | undefined> {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new UnauthorizedException();
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await this.userModel.create({
      userName,
      email,
      password: hashPassword,
    });
    return user;
  }

  async findOne(userName): Promise<User | undefined> {
    const user = await this.userModel.findOne({ userName });
    return user;
  }

  async getById(id): Promise<User | undefined> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async libraryToggle(data): Promise<User | undefined> {
    const { userId, albumId } = data;

    const user = await this.userModel.findOne({ _id: userId });
    const arr = JSON.stringify(user.library);
    let hasInWatchList = arr.includes(albumId);

    if (!hasInWatchList) {
      return this.userModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            library: albumId,
          },
        },
        { returnDocument: 'after' },
      );
    } else {
      return this.userModel.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            library: albumId,
          },
        },
        { returnDocument: 'after' },
      );
    }
  }
}
