import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use (req: Request<unknown>, res: Response<unknown>, next: NextFunction) {
    console.log(`[${req.method.toUpperCase()}] request with baseUrl ${req.baseUrl} and body: ${JSON.stringify(req.body)} has been executed with status code ${res.statusCode}`)
    next()
  }
}
