import { z } from 'zod'

export const recommendationVersionsSchema = z
  .object({
    table_version: z.string(),
    content: z.string(),
    date_created: z.string()
  })
  .required()

export type RecommendationVersionsDTO = z.infer<typeof recommendationVersionsSchema>
