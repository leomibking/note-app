import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(TypeError)
export class TypeErrorExceptionFilter implements ExceptionFilter {
  private readonly LOGGER = new Logger();

  catch(exception: TypeError, host: ArgumentsHost): any {
    this.LOGGER.error(exception, exception.stack);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    });
  }
}
