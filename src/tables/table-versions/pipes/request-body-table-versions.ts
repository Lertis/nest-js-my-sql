import { z } from 'zod'

export const tableVersionsSchema = z
  .object({
    table_version: z.string(),
    content: z.string(),
    date_created: z.string()
  })
  .required()

export type TableVersionsDTO = z.infer<typeof tableVersionsSchema>
