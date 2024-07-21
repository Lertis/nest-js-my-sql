import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { isObjectEmpty } from '../utils'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use (req: Request<unknown>, res: Response<unknown>, next: NextFunction) {
    const { method, originalUrl, statusCode, body, params, query } = { ...req }
    console.log(`[${method.toUpperCase()}] request with baseUrl ${originalUrl} has been executed with status code ${statusCode}.
    \t ${isObjectEmpty(body) ? 'With no body;' : `With body: ${JSON.stringify(body)};`}
    \t ${params ? 'With no params;' : `With params: ${JSON.stringify(params)};`}
    \t ${isObjectEmpty(query) ? 'With no query;' : `With query: ${JSON.stringify(query)};`}`)
    next()
  }
}
