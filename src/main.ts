import {
  ArgumentsHost,
  Catch,
  ClassSerializerInterceptor,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AUTH_TOKEN } from './constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('exceptin: %o', exception);

    let error = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
    if (exception instanceof HttpException) {
      if ((exception as any).response) {
        error = (exception as any).response;
      } else {
        error = {
          statusCode: exception.getStatus(),
          message: exception.message,
        };
      }
    }

    const responseBody = {
      success: false,
      error,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:4000',
      credentials: true,
    },
  });
  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('TripHouse')
    .setDescription('The TripHouse main API')
    .setVersion('0.0.1')
    .addCookieAuth(AUTH_TOKEN)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(morgan('tiny'));
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalInterceptors(new ResponseInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
