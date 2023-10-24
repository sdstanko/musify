import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { FileModule } from "./file/file.module";
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { AlbumModule } from "./album/album.module";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from "./middleware/checkAuthMiddleware";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:tEU6FBLIOLTGsBB6@cluster0.jgikuu1.mongodb.net/?retryWrites=true&w=majority',
    ),
    AlbumModule,
    TrackModule,
    FileModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('auth/check');
  }
}