import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (token) {
      try {
        const decoded = this.jwtService.verify(token); // Decode the JWT token
        req.user = decoded; // Attach the decoded token to req.user
      } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
    }
    next();
  }
}
