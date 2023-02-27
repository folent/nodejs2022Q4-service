import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
    exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const isHandledError = exception instanceof HttpException

    const responseBody = {
        status: isHandledError ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
        response: isHandledError ? { status: exception.getStatus(), body: exception.getResponse() } : { message: 'Internal Server Error' },
        timestamp: new Date().toISOString(),
      };
      
      this.logger.error(JSON.stringify(responseBody.response), HttpExceptionFilter.name)
    
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}