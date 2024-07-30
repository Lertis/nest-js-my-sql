import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { RootModule } from './root.module'

async function bootstrap () {
  const app = await NestFactory.create(RootModule)

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:4900'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  })

  await app.listen(app.get(ConfigService).get('PORT'))
}
bootstrap()
