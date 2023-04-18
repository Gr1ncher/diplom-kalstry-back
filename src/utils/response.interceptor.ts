import { AppResponse } from '@/types/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<AppResponse<T>> {
    return next.handle().pipe(map((data) => ({ success: true, data })));
  }
}
