import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodIssueCode, ZodSchema } from 'zod'

export class ZodValidationPipe<T> implements PipeTransform {
  constructor (private schema: ZodSchema) { }

  transform (value: T) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      const problems = error.issues.map(({ path, code, message }: { message: string, path: string[], code: ZodIssueCode }) => (
        `Property ${JSON.stringify(path.join(', '))} has an error (${code}). Reason: ${message}`
      ))
      throw new BadRequestException(problems)
    }
  }
}
