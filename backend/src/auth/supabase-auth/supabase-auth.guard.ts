import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headerAuth = request.headers.authorization;
    if (!headerAuth || !headerAuth.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = headerAuth.split('Bearer ')[1];
    const jwtSecret = this.configService.get<string>('SUPABASE_JWT_SECRET');
    if (!jwtSecret) {
      throw new UnauthorizedException('No JWT secret provided');
    }
    try {
      const decodedToken = verify(token, jwtSecret);
      request.user = decodedToken;
      console.log('Decoded token:', request.user);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
