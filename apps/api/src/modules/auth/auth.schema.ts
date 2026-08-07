import * as z from 'zod'

export const loginSchema = z.object({
  username: z.string().nonempty().trim(),
  password: z.string().nonempty().trim(),
})

export type LoginDTO = z.infer<typeof loginSchema>
