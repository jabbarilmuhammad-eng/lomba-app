import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminApiGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['x-admin-api-key'];

    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey) {
      throw new UnauthorizedException(
        'ADMIN_API_KEY belum dikonfigurasi',
      );
    }

    if (apiKey !== expectedKey) {
      throw new UnauthorizedException(
        'API key admin tidak valid',
      );
    }

    return true;
  }
}