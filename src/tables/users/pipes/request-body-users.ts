import { z } from 'zod'

export const createUserSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
    dateCreated: z.string(),
  })
  .required()

export type UserDTO = z.infer<typeof createUserSchema>
