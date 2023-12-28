import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path, params, protocol } = req
    const { statusCode } = res

    console.log("************* RequestsMiddleware ***************")

    console.log({
      method,
      statusCode,
      path,
      params,
      protocol
    })

    console.log("*************************************************")

    next();
  }
}
