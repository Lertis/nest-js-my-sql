import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'
import { isEmpty } from 'lodash'

export function randomId (): string {
  return randomStringGenerator()
}

export function isObjectEmpty<T extends object> (v: T): boolean {
  return isEmpty(v)
}
