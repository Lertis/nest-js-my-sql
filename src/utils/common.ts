import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'

export function randomId (): string {
  return randomStringGenerator()
}
