import { z } from 'zod'

export const savedAnswersSchema = z
  .object({
    id: z.string(),
    user_id: z.string(),
    answers: z.string(),
    table_version: z.string(),
    date_created: z.string()
  })
  .required()

export type SavedAnswersDTO = z.infer<typeof savedAnswersSchema>

