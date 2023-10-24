import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
      const decoded = this.jwtService.verify(token, {secret: 'zxc1234'});
      req.body = decoded;
      next();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
